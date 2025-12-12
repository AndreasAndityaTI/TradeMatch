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
      // Get user's products
      const products = await query('SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC', [decoded.userId]);
      return res.status(200).json({ products });
    } else if (req.method === 'POST') {
      // Create new product
      const { title, description, category, price, currency, product_image, quantity_available } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const result = await query(
        'INSERT INTO products (user_id, title, description, category, price, currency, product_image, quantity_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [decoded.userId, title, description || null, category || null, price || null, currency || 'USD', product_image || null, quantity_available || 1]
      );

      return res.status(201).json({
        message: 'Product created',
        product: {
          id: result.insertId,
          user_id: decoded.userId,
          title,
          description,
          category,
          price,
          currency,
          product_image,
          quantity_available,
        },
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Product error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
