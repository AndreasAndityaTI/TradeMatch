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

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Match ID is required' });
    }

    if (req.method === 'PUT') {
      // Update match status
      const { status } = req.body;

      if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      await query('UPDATE matches SET status = ? WHERE id = ?', [status, id]);

      return res.status(200).json({ message: 'Match status updated' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Match detail error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
