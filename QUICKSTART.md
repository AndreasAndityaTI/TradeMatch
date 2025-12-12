# TradeMatch - Quick Start Guide

This guide will help you get TradeMatch up and running quickly.

## Prerequisites

Before you begin, make sure you have installed:
- **Node.js** v16 or higher (Download from https://nodejs.org)
- **MySQL Server** (Download from https://dev.mysql.com/downloads/mysql/)
- **npm** (comes with Node.js)

## Step 1: Install Dependencies

### On macOS/Linux:
```bash
bash install.sh
```

### On Windows:
```bash
install.bat
```

Or manually:
```bash
cd backend
npm install
```

## Step 2: Set Up Database

### Option A: Using MySQL Command Line

```bash
# Connect to MySQL
mysql -u root -p

# Then paste all content from database/schema.sql
# Or run directly:
mysql -u root -p < database/schema.sql
```

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → Select `database/schema.sql`
4. Execute the script (Ctrl+Shift+Enter or Cmd+Shift+Enter)

### Option C: Using phpMyAdmin

1. Open phpMyAdmin in your browser
2. Click "Import"
3. Select `database/schema.sql`
4. Click "Go"

## Step 3: Configure Backend

1. Navigate to the `backend` folder
2. Open `.env.local` file
3. Update the database credentials:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password_here
MYSQL_DATABASE=tradematch
MYSQL_PORT=3306
JWT_SECRET=generate_a_random_secret_key_here
```

## Step 4: Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

## Step 5: Run the Frontend

### Option A: Using Python
```bash
cd /path/to/website_penjual-pembeli
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser

### Option B: Using Node.js
```bash
npx http-server
```
Then open http://localhost:8080 in your browser

### Option C: Direct
Simply open `index.html` in your browser

## Testing the Application

### 1. Register a New User

Go to http://localhost:8000/pages/register.html and fill in:
- Email: `test@example.com`
- Password: `Password123` (must have uppercase and number)
- Username: `testuser`
- Full Name: `Test User`
- User Type: Select "both"

### 2. Login

Go to http://localhost:8000/pages/login.html and login with your credentials

### 3. Test API Endpoints

Use Postman or curl to test the API:

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "username": "testuser",
    "full_name": "Test User",
    "user_type": "both"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

## Troubleshooting

### "Cannot find module 'mysql2'"
```bash
cd backend
npm install mysql2
```

### "Connection refused" from MySQL
- Make sure MySQL is running
- Check your credentials in `.env.local`
- Windows: Start MySQL service from Services
- macOS: Verify MySQL is running via System Preferences

### Port 3000 already in use
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Port 8000 already in use
Change to a different port:
```bash
python3 -m http.server 8001
```

### Password validation fails
Password must meet these requirements:
- At least 6 characters
- At least 1 uppercase letter (A-Z)
- At least 1 number (0-9)

Example valid password: `Password123`

### Database connection error
1. Verify MySQL is running
2. Check credentials in `.env.local`
3. Ensure database `tradematch` exists
4. Try connecting manually:
   ```bash
   mysql -u root -p -e "USE tradematch; SHOW TABLES;"
   ```

## Default Ports

- Backend API: http://localhost:3000
- Frontend (HTTP Server): http://localhost:8000 or http://localhost:8080
- MySQL: localhost:3306 (default)

## File Locations

- Database Schema: `database/schema.sql`
- Backend Config: `backend/.env.local`
- API Routes: `backend/pages/api/`
- Frontend Pages: `pages/*.html`
- Frontend JS: `js/*.js`

## Next Steps

1. Customize the frontend design in `css/style.css`
2. Add more features as needed
3. Deploy to production (follow README.md for production setup)
4. Set up HTTPS/SSL certificates
5. Configure proper JWT_SECRET for production

## Getting Help

If you encounter any issues:
1. Check the troubleshooting section above
2. Review backend console output for errors
3. Check browser developer console (F12)
4. Check MySQL error logs
5. Refer to README.md for more details

## Production Deployment

Before deploying to production:
1. Change `NODE_ENV=production` in `.env.local`
2. Generate a strong JWT_SECRET
3. Use environment-specific database credentials
4. Set up SSL/HTTPS
5. Use a reverse proxy (nginx/Apache)
6. Enable proper error logging
7. Set up database backups

Enjoy using TradeMatch! 🚀
