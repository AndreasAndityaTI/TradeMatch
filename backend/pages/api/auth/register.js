import { query } from '../../../lib/db.js';
import { hashPassword, generateToken, validateEmail, validatePassword } from '../../../lib/auth.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, username, full_name, user_type } = req.body;

    // Validation
    if (!email || !password || !username || !full_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters with 1 uppercase letter and 1 number',
      });
    }

    // Check if user already exists
    const existingUser = await query('SELECT id FROM users WHERE email = ? OR username = ?', [
      email,
      username,
    ]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await query(
      'INSERT INTO users (email, password, username, full_name, user_type) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, username, full_name, user_type || 'both']
    );

    const userId = result.insertId;

    // Generate token
    const token = generateToken(userId, email);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userId,
        email,
        username,
        full_name,
        user_type: user_type || 'both',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
