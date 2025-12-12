import { query } from '../../../lib/db';
import { withCors } from '../../../middleware/auth';

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    // Get user profile with stats
    const users = await query(
      'SELECT id, email, username, full_name, user_type, profile_image, bio, location, phone, rating, total_trades, created_at FROM users WHERE id = ?',
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // Get user's products if they're a seller
    const products = await query('SELECT * FROM products WHERE user_id = ? AND is_available = 1', [user_id]);

    // Get user's ratings
    const ratings = await query(
      'SELECT * FROM ratings WHERE rated_user_id = ? ORDER BY created_at DESC LIMIT 5',
      [user_id]
    );

    return res.status(200).json({
      user: {
        ...user,
        products: products,
        ratings_count: ratings.length,
        ratings: ratings,
      },
    });
  } catch (error) {
    console.error('User profile error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
