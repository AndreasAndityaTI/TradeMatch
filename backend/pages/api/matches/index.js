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
      // Get user's matches
      const matches = await query(
        `SELECT m.*, 
          CASE 
            WHEN m.user_id_1 = ? THEN u2.username
            ELSE u1.username
          END as matched_user,
          CASE 
            WHEN m.user_id_1 = ? THEN u2.id
            ELSE u1.id
          END as matched_user_id
        FROM matches m
        JOIN users u1 ON m.user_id_1 = u1.id
        JOIN users u2 ON m.user_id_2 = u2.id
        WHERE m.user_id_1 = ? OR m.user_id_2 = ?
        ORDER BY m.created_at DESC`,
        [decoded.userId, decoded.userId, decoded.userId, decoded.userId]
      );

      return res.status(200).json({ matches });
    } else if (req.method === 'POST') {
      // Create a match
      const { other_user_id, product_id, match_type } = req.body;

      if (!other_user_id) {
        return res.status(400).json({ error: 'other_user_id is required' });
      }

      // Check if match already exists
      const existing = await query(
        'SELECT id FROM matches WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)',
        [decoded.userId, other_user_id, other_user_id, decoded.userId]
      );

      if (existing.length > 0) {
        return res.status(400).json({ error: 'Match already exists' });
      }

      const result = await query(
        'INSERT INTO matches (user_id_1, user_id_2, product_id, match_type) VALUES (?, ?, ?, ?)',
        [decoded.userId, other_user_id, product_id || null, match_type || 'interest']
      );

      return res.status(201).json({ message: 'Match created', match_id: result.insertId });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Matches error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
