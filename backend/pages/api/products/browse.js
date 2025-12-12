import { query } from '../../../lib/db';
import { withCors } from '../../../middleware/auth';

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { category, search, limit = 20, offset = 0 } = req.query;

    let sql = 'SELECT p.*, u.username, u.full_name, u.rating FROM products p JOIN users u ON p.user_id = u.id WHERE p.is_available = 1';
    const params = [];

    if (category) {
      sql += ' AND p.category = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (p.title LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const products = await query(sql, params);

    // Get total count
    let countSql = 'SELECT COUNT(*) as count FROM products WHERE is_available = 1';
    const countParams = [];
    if (category) {
      countSql += ' AND category = ?';
      countParams.push(category);
    }
    if (search) {
      countSql += ' AND (title LIKE ? OR description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const countResult = await query(countSql, countParams);
    const total = countResult[0].count;

    return res.status(200).json({
      products,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < total,
      },
    });
  } catch (error) {
    console.error('Browse products error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
