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
      // Get messages for current user
      const { match_id, limit = 50, offset = 0 } = req.query;

      let sql = `SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) `;
      const params = [decoded.userId, decoded.userId];

      if (match_id) {
        sql += ` AND match_id = ?`;
        params.push(match_id);
      }

      sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
      params.push(parseInt(limit), parseInt(offset));

      const messages = await query(sql, params);

      // Mark messages as read
      if (match_id) {
        await query(
          'UPDATE messages SET is_read = 1 WHERE match_id = ? AND receiver_id = ? AND is_read = 0',
          [match_id, decoded.userId]
        );
      }

      return res.status(200).json({ messages });
    } else if (req.method === 'POST') {
      // Send a message
      const { receiver_id, match_id, message_text } = req.body;

      if (!receiver_id || !message_text) {
        return res.status(400).json({ error: 'receiver_id and message_text are required' });
      }

      const result = await query(
        'INSERT INTO messages (sender_id, receiver_id, match_id, message_text) VALUES (?, ?, ?, ?)',
        [decoded.userId, receiver_id, match_id || null, message_text]
      );

      return res.status(201).json({
        message: 'Message sent',
        message_id: result.insertId,
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Messages error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
