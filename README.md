# TradeMatch

TradeMatch is a marketplace web application connecting sellers and buyers with product listings, matching, messaging and rating features.

This repository contains a Next.js backend API and simple static frontend pages for local development and testing.

## Key Points

- Backend: `backend/` (Next.js API routes)
- Database: MySQL (schema in `database/schema.sql`)
- Frontend: static pages in `pages/` with JS in `js/`

## Quick Start (local)

Prerequisites:
- Node.js v16+ (recommended)
- npm
- MySQL server (5.7+)

1) Create the database and tables

```bash
# Import the schema (uses MySQL CLI)
mysql -u root -p < database/schema.sql
```

2) Backend setup

```bash
cd backend
cp .env.local.example .env.local
# Edit .env.local to set MYSQL_HOST/USER/PASSWORD and JWT_SECRET if desired
npm install
npm run dev
```

The backend runs at `http://localhost:3000` by default.

3) Frontend (static pages)

You can serve the static frontend with a simple HTTP server from project root:

```bash
# from repo root
python3 -m http.server 8000
```
Open `http://localhost:8000/pages/login.html` in your browser.

## Demo credentials

- Email: `test@example.com`
- Password: `Password123`

If login fails because the demo user is not present, create it using the register endpoint (recommended):

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","username":"demo_user","full_name":"Demo User","user_type":"both"}'
```

After successful registration you can login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'
```

The login response returns a JWT token. Use it in subsequent requests with the header:

```
Authorization: Bearer <token>
```

## Useful commands

- Import DB schema: `mysql -u root -p < database/schema.sql`
- Start backend dev server: `cd backend && npm run dev`
- Build backend for production: `cd backend && npm run build && npm start`

## API Overview

See `API_TESTING.md` for full curl examples. Main API areas:
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — login (returns JWT)
- `GET/PUT /api/users/profile` — profile APIs (auth required)
- `GET/POST/PUT/DELETE /api/products` — product CRUD
- `GET/POST /api/matches` — matching endpoints
- `GET/POST /api/messages` — messaging
- `GET/POST /api/ratings` — user ratings

## Troubleshooting

- "Invalid email or password" on login: ensure the demo user exists. Use the register endpoint to create it.
- Backend DB connection errors: check `.env.local` and ensure MySQL is running and accessible.
- npm install errors for `jsonwebtoken`: the project uses `jsonwebtoken@^8.5.1`. If you hit registry/version issues, run:

```bash
npm config get registry
npm config set registry https://registry.npmjs.org/
npm cache verify
rm -rf node_modules package-lock.json
npm install
```

## Development notes

- Passwords are hashed with `bcryptjs`.
- Tokens are signed with `jsonwebtoken` and the secret is set with `JWT_SECRET` in `.env.local`.
- Database utilities are in `backend/lib/db.js`.

## Where to look next

- Backend API code: `backend/pages/api/`
- DB schema: `database/schema.sql`
- Frontend pages: `pages/` and `js/`
- API test examples: `API_TESTING.md`

---

If you'd like, I can also add a small `scripts/seed-demo.js` that registers the demo user automatically (you run it locally). Tell me if you want that.
MYSQL_PORT=3306
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📞 Support

For issues or questions, please create an issue in the repository.
