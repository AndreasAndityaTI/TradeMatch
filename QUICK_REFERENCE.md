# TradeMatch - Quick Reference Card

## 🚀 Setup in 3 Commands

```bash
# 1. Install dependencies
cd backend && npm install

# 2. Setup database (in MySQL)
mysql -u root -p < database/schema.sql

# 3. Start backend
npm run dev  # Backend runs on http://localhost:3000
```

## 📋 Key Files

| File | Purpose |
|------|---------|
| `database/schema.sql` | MySQL database schema |
| `backend/.env.local` | Configuration file |
| `backend/pages/api/*` | API endpoints |
| `js/api-client.js` | Frontend API client |
| `js/dashboard.js` | Dashboard logic |

## 🔌 Main API Endpoints

```
Authentication
├── POST   /api/auth/register      → Register user
└── POST   /api/auth/login         → Login user

Users
├── GET    /api/users/profile      → Get my profile
├── PUT    /api/users/profile      → Update profile
└── GET    /api/users/[id]         → Get user by ID

Products
├── GET    /api/products           → List my products
├── POST   /api/products           → Create product
├── GET    /api/products/[id]      → Get product
├── PUT    /api/products/[id]      → Update product
├── DELETE /api/products/[id]      → Delete product
└── GET    /api/products/browse    → Browse products

Matches
├── GET    /api/matches            → Get matches
├── POST   /api/matches            → Create match
└── PUT    /api/matches/[id]       → Update match

Messages
├── GET    /api/messages           → Get messages
└── POST   /api/messages           → Send message

Ratings
├── GET    /api/ratings            → Get ratings
└── POST   /api/ratings            → Create rating
```

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| users | User accounts |
| products | Product listings |
| matches | Trade matches |
| messages | Direct messaging |
| ratings | User reviews |
| buyer_profiles | Buyer preferences |
| transactions | Trade records |

## ⚙️ Environment Variables

```env
# Database
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=tradematch

# Auth
JWT_SECRET=random_secret_key
JWT_EXPIRY=7d

# Server
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

## 🧪 Test First User

### Register
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

### Login (save token)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Use Token
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 💻 Terminal Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend (Python)
python3 -m http.server 8000

# Start frontend (Node.js)
npx http-server

# Test database
mysql -u root -p -e "USE tradematch; SHOW TABLES;"

# View database
mysql -u root -p tradematch

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 📚 Documentation Map

| Document | Read Time | Purpose |
|----------|-----------|---------|
| QUICKSTART.md | 5 min | Fast setup |
| SETUP_GUIDE.md | 20 min | Detailed setup |
| README.md | 20 min | Full reference |
| API_TESTING.md | 10 min | API examples |
| IMPLEMENTATION_CHECKLIST.md | 30 min | Verify setup |

## ✅ Verification Checklist

- [ ] Node.js installed: `node --version`
- [ ] MySQL running: `mysql -u root -p -e "SELECT 1;"`
- [ ] Dependencies installed: `npm install` completed
- [ ] `.env.local` configured with credentials
- [ ] Database imported: `mysql -u root -p < database/schema.sql`
- [ ] Backend starts: `npm run dev`
- [ ] Frontend loads: http://localhost:8000
- [ ] User can register
- [ ] User can login
- [ ] API returns data

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| MySQL error | Check credentials in `.env.local` |
| Port in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Module error | Run `npm install` again |
| No DB tables | Run `mysql -u root -p < database/schema.sql` |
| API 401 error | Check JWT token is valid |
| CORS error | Check `NEXT_PUBLIC_API_URL` setting |

## 🔐 Security Notes

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for API auth
- ✅ SQL parameterized queries
- ✅ Environment variables for secrets
- ✅ Input validation on all endpoints
- ⚠️ Change JWT_SECRET in production
- ⚠️ Use HTTPS in production
- ⚠️ Never commit `.env.local` to git

## 📊 Tech Stack

- Node.js v16+
- Next.js v14
- MySQL v5.7+
- React v18.2
- JWT v9.1
- bcryptjs v2.4.3

## 🎯 Usage Example (JavaScript)

```javascript
// Initialize API client
const api = new TradeMatchAPI();

// Register
await api.register('email@example.com', 'Password123', 'username', 'Full Name');

// Login
await api.login('email@example.com', 'Password123');

// Create product
await api.createProduct({
  title: 'Product Name',
  price: 99.99,
  category: 'Electronics'
});

// Browse products
const products = await api.browseProducts({ search: 'iPhone' });

// Send message
await api.sendMessage(userId, 'Hello!');

// Rate user
await api.createRating(userId, 5, 'Great trader!');
```

## 🚀 Deploy to Production

```bash
# Build
npm run build

# Start
npm start

# Set environment
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
JWT_SECRET=very_long_random_secret
```

## 📱 Frontend Pages

- `index.html` - Landing page
- `pages/register.html` - Sign up
- `pages/login.html` - Login
- `pages/dashboard.html` - Dashboard

## 🔄 Development Workflow

```
Edit code → Backend auto-reloads → Refresh browser → Test
```

## 📞 Need Help?

1. Check QUICKSTART.md Troubleshooting
2. Review backend console output
3. Check browser console (F12)
4. Read README.md API docs
5. Check API_TESTING.md examples

## ✨ Features At a Glance

✅ User authentication  
✅ Product management  
✅ Smart matching  
✅ Direct messaging  
✅ Rating system  
✅ Transaction tracking  
✅ Search & filter  
✅ User profiles  

## 🎯 Next Steps

1. ✅ Complete setup (this page)
2. 📖 Read QUICKSTART.md
3. 🧪 Test endpoints from API_TESTING.md
4. 🎨 Customize frontend
5. 🚀 Deploy to production

---

**Print this page for quick reference during development!**

Last updated: December 9, 2025
