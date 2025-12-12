import { query } from '../../../lib/db';
import { withCors } from '../../../middleware/auth';

async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    if (req.method === 'GET') {
      // Get product details
      const products = await query(
        'SELECT p.*, u.username, u.full_name, u.rating FROM products p JOIN users u ON p.user_id = u.id WHERE p.id = ?',
        [id]
      );

      if (products.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.status(200).json({ product: products[0] });
    } else if (req.method === 'PUT') {
      // Update product
      const { title, description, category, price, currency, product_image, is_available, quantity_available } = req.body;

      // Check if user owns the product
      const products = await query('SELECT user_id FROM products WHERE id = ?', [id]);
      if (products.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await query(
        'UPDATE products SET title = COALESCE(?, title), description = COALESCE(?, description), category = COALESCE(?, category), price = COALESCE(?, price), currency = COALESCE(?, currency), product_image = COALESCE(?, product_image), is_available = COALESCE(?, is_available), quantity_available = COALESCE(?, quantity_available) WHERE id = ?',
        [title || null, description || null, category || null, price || null, currency || null, product_image || null, is_available !== undefined ? is_available : null, quantity_available || null, id]
      );

      return res.status(200).json({ message: 'Product updated' });
    } else if (req.method === 'DELETE') {
      // Delete product
      await query('DELETE FROM products WHERE id = ?', [id]);
      return res.status(200).json({ message: 'Product deleted' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Product detail error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(handler);
