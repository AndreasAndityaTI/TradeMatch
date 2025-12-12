# TradeMatch Implementation Checklist

## 📋 Complete Setup Checklist

### Phase 1: Prerequisites (Before Starting)
- [ ] Node.js v16+ installed
- [ ] npm installed and working
- [ ] MySQL Server installed and running
- [ ] MySQL client (command line or Workbench) available
- [ ] Text editor or IDE ready (VS Code recommended)
- [ ] Terminal/Command prompt ready

### Phase 2: Database Setup
- [ ] Navigate to project root
- [ ] Verify `database/schema.sql` exists
- [ ] Open MySQL client
- [ ] Import schema.sql:
  - [ ] Command line: `mysql -u root -p < database/schema.sql`
  - [ ] Or in MySQL: `source database/schema.sql;`
  - [ ] Or in Workbench: Import file and execute
- [ ] Verify database created: `mysql -u root -p -e "USE tradematch; SHOW TABLES;"`
- [ ] Verify 8 tables exist:
  - [ ] users
  - [ ] products
  - [ ] buyer_profiles
  - [ ] matches
  - [ ] messages
  - [ ] ratings
  - [ ] transactions

### Phase 3: Backend Installation
- [ ] Navigate to `backend/` folder
- [ ] Run: `npm install`
- [ ] Wait for installation to complete (1-2 minutes)
- [ ] Verify no errors in output
- [ ] Check `node_modules/` folder exists
- [ ] Check `package-lock.json` created

### Phase 4: Configuration
- [ ] Create `.env.local` from `.env.local.example`:
  - [ ] `cp .env.local.example .env.local` (Mac/Linux)
  - [ ] Or copy manually on Windows
- [ ] Open `.env.local` in text editor
- [ ] Update these variables:
  - [ ] `MYSQL_HOST=localhost` (or your server IP)
  - [ ] `MYSQL_USER=root` (or your username)
  - [ ] `MYSQL_PASSWORD=your_password`
  - [ ] `MYSQL_DATABASE=tradematch`
  - [ ] `MYSQL_PORT=3306`
  - [ ] `JWT_SECRET=your_random_secret_key` (generate random string)
  - [ ] `NEXT_PUBLIC_API_URL=http://localhost:3000`
  - [ ] `NODE_ENV=development`
- [ ] Save `.env.local`
- [ ] Test MySQL connection:
  ```bash
  mysql -h localhost -u root -p -e "SELECT 1;"
  ```

### Phase 5: Backend Testing
- [ ] From `backend/` folder, run: `npm run dev`
- [ ] Wait for server to start
- [ ] Look for message: "ready - started server on 0.0.0.0:3000"
- [ ] Verify no errors in output
- [ ] Leave terminal running

### Phase 6: API Testing (New Terminal)
- [ ] Open new terminal/tab
- [ ] Navigate to project root
- [ ] Test registration endpoint:
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@example.com",
      "password": "Password123",
      "username": "testuser",
      "full_name": "Test User",
      "user_type": "both"
    }'
  ```
- [ ] Verify response contains token and user data
- [ ] Extract token from response for next test
- [ ] Test profile endpoint with token:
  ```bash
  curl -X GET http://localhost:3000/api/users/profile \
    -H "Authorization: Bearer <token_from_previous_response>"
  ```
- [ ] Verify user data returned

### Phase 7: Frontend Setup
- [ ] Open new terminal/tab
- [ ] Navigate to project root
- [ ] Start HTTP server (choose one):
  - [ ] Python 3: `python3 -m http.server 8000`
  - [ ] Node.js: `npx http-server`
  - [ ] Or open `index.html` directly in browser
- [ ] If using server, open browser to http://localhost:8000
- [ ] Verify landing page loads
- [ ] Check browser console (F12) for errors

### Phase 8: Authentication Testing
- [ ] Click "Sign Up" or navigate to `/pages/register.html`
- [ ] Fill in registration form:
  - [ ] Email: `john@example.com`
  - [ ] Password: `Password123`
  - [ ] Username: `johndoe`
  - [ ] Full Name: `John Doe`
  - [ ] User Type: Select "both"
- [ ] Click Submit
- [ ] Check browser console for any errors
- [ ] If error, check backend console for error details
- [ ] Navigate to `/pages/login.html`
- [ ] Login with credentials:
  - [ ] Email: `john@example.com`
  - [ ] Password: `Password123`
- [ ] Verify successful login

### Phase 9: Full Feature Testing
- [ ] After login, verify dashboard page loads
- [ ] Check that user name displays
- [ ] Navigate to create product (if link exists)
- [ ] Create a test product:
  - [ ] Title: "Test Product"
  - [ ] Description: "Test description"
  - [ ] Price: "99.99"
  - [ ] Category: "Electronics"
- [ ] Verify product created in database:
  ```bash
  mysql -u root -p tradematch -e "SELECT * FROM products;"
  ```
- [ ] Test product browsing endpoint:
  ```bash
  curl "http://localhost:3000/api/products/browse?limit=10"
  ```
- [ ] Verify product appears in results

### Phase 10: Database Verification
- [ ] Connect to MySQL:
  ```bash
  mysql -u root -p tradematch
  ```
- [ ] Run queries to verify data:
  - [ ] `SELECT * FROM users;` (should see registered user)
  - [ ] `SELECT * FROM products;` (should see created product)
  - [ ] `DESC users;` (verify table structure)
  - [ ] `SHOW KEYS FROM users;` (verify indexes)

### Phase 11: Documentation Review
- [ ] Read `README.md` for overview
- [ ] Read `QUICKSTART.md` for quick reference
- [ ] Read `SETUP_GUIDE.md` for detailed instructions
- [ ] Read `API_TESTING.md` for API examples
- [ ] Read `INSTALLATION_SUMMARY.md` for summary
- [ ] Review `DIRECTORY_STRUCTURE.md` for file layout

### Phase 12: Troubleshooting (If Needed)
- [ ] Check backend console for errors
- [ ] Check browser console (F12) for errors
- [ ] Check MySQL connection: `mysql -u root -p -e "SELECT 1;"`
- [ ] Verify `.env.local` credentials
- [ ] Check port 3000 not in use: `lsof -ti:3000`
- [ ] Try clearing node_modules: `rm -rf node_modules && npm install`
- [ ] Try clearing Next.js cache: `rm -rf .next`

### Phase 13: Advanced Testing (Optional)
- [ ] Test message sending:
  ```bash
  curl -X POST http://localhost:3000/api/messages \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{
      "receiver_id": 2,
      "message_text": "Hello!"
    }'
  ```
- [ ] Test rating creation:
  ```bash
  curl -X POST http://localhost:3000/api/ratings \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{
      "rated_user_id": 2,
      "rating": 5,
      "review": "Great trader!"
    }'
  ```
- [ ] Create multiple test users
- [ ] Test matching between users
- [ ] Test product browsing with filters

### Phase 14: Production Preparation (Optional)
- [ ] Set `NODE_ENV=production` in `.env.local`
- [ ] Generate strong JWT_SECRET
- [ ] Configure production database
- [ ] Set up SSL/HTTPS certificate
- [ ] Set up reverse proxy (nginx/Apache)
- [ ] Configure firewall rules
- [ ] Enable database backups
- [ ] Set up error logging
- [ ] Configure email service (future feature)

### Phase 15: Final Verification
- [ ] All endpoints respond correctly
- [ ] Database queries complete successfully
- [ ] Frontend loads without errors
- [ ] Authentication works properly
- [ ] Data persists in database
- [ ] CORS allows frontend-backend communication
- [ ] Tokens expire correctly
- [ ] Error messages display properly

## ✅ Success Indicators

When you've completed setup successfully, you should see:
- ✅ Backend running on `http://localhost:3000`
- ✅ Frontend accessible on `http://localhost:8000` or direct HTML
- ✅ User can register with valid data
- ✅ User can login with correct credentials
- ✅ User profile displays after login
- ✅ Products can be created and browsed
- ✅ Matches between users can be created
- ✅ Messages can be sent between users
- ✅ Ratings can be created for users
- ✅ No 404 errors in console
- ✅ No 500 errors in backend
- ✅ Database tables all populated

## 🔄 Daily Development Workflow

### Every Session:
```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend Server
python3 -m http.server 8000
# Open http://localhost:8000 in browser
```

### Testing New Features:
1. Make changes to API code
2. Backend auto-reloads (Next.js dev mode)
3. Make changes to frontend JS
4. Refresh browser (Cmd+R or Ctrl+R)
5. Test with browser console open (F12)
6. Check backend console for errors

### Database Changes:
```bash
# Connect to database
mysql -u root -p tradematch

# Verify changes
SELECT * FROM users;
SELECT * FROM products;
```

## 📊 File Checklist

### Core Files Present:
- [ ] `database/schema.sql` (SQL schema)
- [ ] `backend/package.json` (Dependencies)
- [ ] `backend/.env.local` (Configuration)
- [ ] `backend/pages/api/auth/register.js`
- [ ] `backend/pages/api/auth/login.js`
- [ ] `backend/pages/api/users/profile.js`
- [ ] `backend/pages/api/products/index.js`
- [ ] `backend/pages/api/matches/index.js`
- [ ] `backend/pages/api/messages/index.js`
- [ ] `backend/pages/api/ratings/index.js`
- [ ] `backend/lib/db.js`
- [ ] `backend/lib/auth.js`
- [ ] `backend/middleware/auth.js`
- [ ] `js/api-client.js`
- [ ] `js/dashboard.js`
- [ ] `js/utils.js`
- [ ] `pages/login.html`
- [ ] `pages/register.html`
- [ ] `pages/dashboard.html`
- [ ] `README.md`
- [ ] `QUICKSTART.md`
- [ ] `SETUP_GUIDE.md`
- [ ] `API_TESTING.md`

## 🎯 Quick Troubleshooting Checklist

| Problem | Solution |
|---------|----------|
| MySQL connection fails | Verify credentials in `.env.local` |
| Database not found | Run `mysql -u root -p < database/schema.sql` |
| Backend won't start | Check port 3000 not in use |
| Frontend won't load | Check HTTP server is running |
| API returns 401 | Verify JWT token is valid |
| CORS error | Check `NEXT_PUBLIC_API_URL` setting |
| Module error | Run `npm install` in backend folder |
| Password validation fails | Use format: Password123 (uppercase+number+6chars) |

## 🎉 Completion

When all phases are complete, you have:
✅ Full-featured seller-buyer platform  
✅ Complete MySQL database  
✅ RESTful API with 18 endpoints  
✅ JWT authentication  
✅ Messaging system  
✅ Rating system  
✅ Product management  

**You're ready to start building! 🚀**
