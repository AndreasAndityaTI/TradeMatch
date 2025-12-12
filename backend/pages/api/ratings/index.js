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

    if (req.method === 'POST') {
      // Create a rating
      const { rated_user_id, rating, review, match_id } = req.body;

      if (!rated_user_id || !rating) {
        return res.status(400).json({ error: 'rated_user_id and rating are required' });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }

      // Check if rating already exists
      const existing = await query(
        'SELECT id FROM ratings WHERE rater_id = ? AND rated_user_id = ? AND match_id = ?',
        [decoded.userId, rated_user_id, match_id || null]
      );

      if (existing.length > 0) {
        return res.status(400).json({ error: 'You have already rated this user for this match' });
      }

      const result = await query(
        'INSERT INTO ratings (rater_id, rated_user_id, rating, review, match_id) VALUES (?, ?, ?, ?, ?)',
        [decoded.userId, rated_user_id, rating, review || null, match_id || null]
      );

      // Update user's average rating
      const avgRating = await query(
        'SELECT AVG(rating) as avg_rating FROM ratings WHERE rated_user_id = ?',
        [rated_user_id]
      );

      if (avgRating.length > 0) {
        await query('UPDATE users SET rating = ? WHERE id = ?', [
          avgRating[0].avg_rating.toFixed(2),
          rated_user_id,
        ]);
      }

      return res.status(201).json({
        message: 'Rating created',
        rating_id: result.insertId,
      });
    } else if (req.method === 'GET') {
      // Get ratings for a user
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
      }

      const ratings = await query(
        `SELECT r.*, u.username, u.full_name 
        FROM ratings r 
        JOIN users u ON r.rater_id = u.id 
        WHERE r.rated_user_id = ? 
        ORDER BY r.created_at DESC`,
        [user_id]
      );

      return res.status(200).json({ ratings });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Ratings error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
