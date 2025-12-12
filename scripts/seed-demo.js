#!/usr/bin/env node
/**
 * scripts/seed-demo.js
 * Simple script to register the demo user via the backend API.
 * Run: `node scripts/seed-demo.js`
 * Requires backend running at http://localhost:3000
 */

const http = require('http');

const payload = JSON.stringify({
  email: 'test@example.com',
  password: 'Password123',
  username: 'demo_user',
  full_name: 'Demo User',
  user_type: 'both',
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data || '{}');
      console.log('Status:', res.statusCode);
      console.log('Response:', JSON.stringify(parsed, null, 2));
      if (res.statusCode === 201) {
        console.log('\nDemo user created and token saved to output (if any).');
      } else if (parsed.error) {
        console.log('\nServer returned error:', parsed.error);
      } else {
        console.log('\nUnexpected response — check backend logs.');
      }
    } catch (e) {
      console.error('Failed to parse response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
  console.error('Make sure the backend is running at http://localhost:3000');
});

req.write(payload);
req.end();
