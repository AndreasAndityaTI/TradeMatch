import { query } from '../../../lib/db';
import { verifyToken, extractToken } from '../../../lib/auth';
import { withCors } from '../../../middleware/auth';

async function handler(req, res) {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (req.method === 'GET') {
      // Get user profile
      const users = await query('SELECT id, email, username, full_name, user_type, profile_image, bio, location, phone, rating, total_trades, created_at FROM users WHERE id = ?', [
        decoded.userId,
      ]);

      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ user: users[0] });
    } else if (req.method === 'PUT') {
      // Update user profile
      const { full_name, bio, location, phone, profile_image } = req.body;

      await query(
        'UPDATE users SET full_name = COALESCE(?, full_name), bio = COALESCE(?, bio), location = COALESCE(?, location), phone = COALESCE(?, phone), profile_image = COALESCE(?, profile_image) WHERE id = ?',
        [full_name || null, bio || null, location || null, phone || null, profile_image || null, decoded.userId]
      );

      const users = await query('SELECT id, email, username, full_name, user_type, profile_image, bio, location, phone FROM users WHERE id = ?', [decoded.userId]);

      return res.status(200).json({ message: 'Profile updated', user: users[0] });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
