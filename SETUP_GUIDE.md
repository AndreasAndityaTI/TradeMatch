# TradeMatch Backend Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Database Setup

### 1. Create MySQL Database
```bash
# Open MySQL in terminal
mysql -u root -p

# Then run the SQL commands from database/schema.sql
source /path/to/database/schema.sql

# Or copy-paste the contents directly
```

### 2. Verify Database Creation
```bash
mysql -u root -p -e "USE tradematch; SHOW TABLES;"
```

## Backend Installation

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your MySQL credentials and other settings
nano .env.local
# or
vim .env.local
```

Update the following in `.env.local`:
- `MYSQL_HOST` - Your MySQL server host (usually `localhost`)
- `MYSQL_USER` - MySQL username (default: `root`)
- `MYSQL_PASSWORD` - MySQL password
- `MYSQL_DATABASE` - Database name (should be `tradematch`)
- `JWT_SECRET` - Generate a strong secret key for JWT tokens

### 4. Start Development Server
```bash
npm run dev
```

The backend will start at `http://localhost:3000`

## Testing the Backend

### Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "username": "testuser",
    "full_name": "Test User",
    "user_type": "both"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users/[id]` - Get user profile by ID

### Products
- `GET /api/products` - Get current user's products
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/products/browse` - Browse all available products

### Matches
- `GET /api/matches` - Get user's matches
- `POST /api/matches` - Create a match
- `PUT /api/matches/[id]` - Update match status

### Messages
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send a message

### Ratings
- `GET /api/ratings` - Get user ratings
- `POST /api/ratings` - Create a rating

## Database Schema

The database includes the following tables:
- `users` - User accounts
- `products` - Products listed for sale
- `buyer_profiles` - Buyer preferences
- `matches` - Matched trade partners
- `messages` - Messages between users
- `ratings` - User ratings and reviews
- `transactions` - Trade transactions

## Production Deployment

1. Set `NODE_ENV=production` in `.env.local`
2. Generate a strong `JWT_SECRET`
3. Use environment-specific database credentials
4. Set up SSL/TLS for API communications
5. Consider using a reverse proxy (nginx)
6. Set up regular backups of your MySQL database

## Troubleshooting

### Connection Issues
- Ensure MySQL server is running: `mysql -u root -p -e "SELECT 1"`
- Check `.env.local` credentials
- Verify database exists: `mysql -u root -p -e "USE tradematch;"`

### Module Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next && npm run dev`

### Password Validation
Passwords must:
- Be at least 6 characters long
- Contain at least 1 uppercase letter
- Contain at least 1 number

Example: `Password123`

## Support

For issues or questions, check:
1. MySQL error logs
2. Backend console output
3. Browser developer console (for frontend integration)
