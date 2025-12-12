# Demo Login Setup

The demo account credentials in `pages/login.html` are:
- **Email**: `test@example.com`
- **Password**: `Password123`

This account **does not exist by default** and must be created before you can log in.

## Quick Setup (3 steps)

### Step 1: Start the backend
```bash
cd backend
npm run dev
```
Watch the terminal for "compiled successfully" or listening on port 3000.

### Step 2: Create the demo user (from repo root in a new terminal)
```bash
node scripts/seed-demo.js
```
Expected output: HTTP 201 with registered user and token.

### Step 3: Test login
Open your browser to:
```
http://localhost:8000/pages/login.html
```
Use:
- Email: `test@example.com`
- Password: `Password123`

---

## If step 2 fails

### Error: Connection refused
- Backend is not running. Go back to Step 1 and ensure backend terminal shows "ready on port 3000" or similar.

### Error: "User already exists"
- The demo user was already created (from a previous run). Just proceed to Step 3 and log in.

### Error: Something else
Run the curl command manually and paste the output:
```bash
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","username":"demo_user","full_name":"Demo User","user_type":"both"}'
```

---

## Manual registration (if seed script fails)

If `node scripts/seed-demo.js` doesn't work, use curl directly:

```bash
# Register demo user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","username":"demo_user","full_name":"Demo User","user_type":"both"}'

# If successful, you'll see: {"message":"User registered successfully","token":"...","user":{...}}

# Then test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'
```

---

## Database check (advanced)

If you want to confirm the demo user was created:
```bash
mysql -u root -p -D tradematch -e "SELECT id, email, username FROM users WHERE email='test@example.com';"
```
If you see a row, the user exists in the database.

---

## After login

Once logged in, you can:
- View your dashboard at `/pages/dashboard.html`
- Browse and express interest in products at `/pages/matches.html`
- View your messages at `/pages/messages.html`
- Create products at `/pages/products.html`

