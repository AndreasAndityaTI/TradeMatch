# TradeMatch - Complete User Guide

## 🎯 What is TradeMatch?

TradeMatch is a modern peer-to-peer marketplace platform that connects buyers and sellers. Users can list products, browse listings, connect with other traders, and build a trusted community through ratings and reviews.

## 🚀 Getting Started

### 1. **Registration & Login**

#### Sign Up
1. Visit `pages/register.html`
2. Fill in your details:
   - **Email**: Your email address (unique identifier)
   - **Username**: Your display name
   - **Full Name**: Your real name
   - **Password**: Must contain:
     - Minimum 6 characters
     - At least 1 uppercase letter
     - At least 1 number
   - **Account Type**: Choose one:
     - **Seller**: You want to sell products
     - **Buyer**: You want to buy products
     - **Both**: You want to buy and sell

3. Click "Register" - You'll be redirected to login
4. Use your email and password to login

#### Login
1. Visit `pages/login.html`
2. Enter your email and password
3. Click "Login" to access your dashboard
4. Demo credentials available in the form (for testing)

### 2. **Dashboard Overview** (`pages/dashboard.html`)

After logging in, you'll see your main dashboard with:

- **Total Matches**: Number of connection requests you've received/sent
- **Unread Messages**: Count of new messages
- **My Products**: Total products you've listed
- **My Rating**: Your seller/buyer rating (★★★★★)

#### Dashboard Navigation

The left sidebar menu provides access to all features:

| Menu Item | Purpose |
|-----------|---------|
| **Dashboard** | View statistics and overview |
| **My Profile** | Edit your profile information |
| **My Products** | View and manage your listed products |
| **Browse Products** | Search and discover products from other users |
| **Matches** | View connection requests and respond |
| **Messages** | Chat with other traders |
| **+ Add Product** | List a new product for sale |

---

## 📦 Product Management

### Adding Products

1. Click **"+ Add Product"** from the sidebar
2. Fill in the product details:
   - **Title**: Product name (required)
   - **Description**: Detailed description
   - **Category**: Product category (e.g., Electronics, Furniture, Books)
   - **Price**: Product price (required)
   - **Currency**: USD, EUR, or GBP

3. Click **"Create Product"** - Your product is now live!

### Managing Your Products

1. Click **"My Products"** from sidebar
2. View all your listed products
3. Each product shows:
   - Title and description
   - Price
   - Category
   - **Edit** button: Modify product details
   - **Delete** button: Remove the product

---

## 🔍 Browsing & Finding Products

### Search & Filter

1. Click **"Browse Products"** from sidebar
2. Use the search tools:
   - **Search Bar**: Search by product title
   - **Category Filter**: Filter by category
   - **Sort Options**:
     - Newest First (default)
     - Price: Low to High
     - Price: High to Low
     - Highest Rated

3. Click **"Search"** to apply filters
4. Click **"Reset"** to clear all filters

### Product Details

Each product card displays:
- **Product Title** and **Price**
- **Description**
- **Category** and **Condition**
- **Seller Information**:
  - Seller name
  - Rating (★ out of 5)
  - Number of completed trades

### Show Interest

1. Browse products you're interested in
2. Click **"📩 Show Interest"** button
3. Optionally send a message to the seller
4. The seller will receive your interest notification

---

## 🤝 Matches System

### Understanding Matches

A "match" is a connection between a buyer interested in a product and the seller.

### Viewing Matches

1. Click **"Matches"** from sidebar
2. See all your matches with:
   - **Matched User**: Who you matched with
   - **Status**: 
     - `pending`: Waiting for response
     - `accepted`: Connection accepted
     - `rejected`: Connection declined

### Responding to Matches

1. View your matches
2. For each match, you can:
   - **Accept**: Click "Accept" to confirm the connection
   - **Reject**: Click "Reject" to decline

### After a Match

Once matched:
- You can message each other via the Messages section
- Exchange details and negotiate
- Complete the trade offline
- Leave ratings and reviews

---

## 💬 Messaging & Communication

### Accessing Messages

1. Click **"Messages"** from sidebar
2. View all your active conversations

### Conversation List

Left panel shows all conversations:
- **Unread messages** are highlighted
- Shows most recent message preview
- Time of last message
- Sort by newest first

### Sending Messages

1. Select a conversation from the left
2. View message history
3. Type your message in the input box
4. Click **"Send"** or press Enter
5. Message appears instantly

### Features

- **Real-time Updates**: Messages refresh automatically every 3 seconds
- **Message History**: View all past messages with a user
- **Timestamps**: See when each message was sent
- **Read Status**: Track if messages have been read

---

## 👤 Profile Management

### Viewing Your Profile

1. Click **"My Profile"** from sidebar
2. Edit your information:
   - **Full Name**: Your real name
   - **Bio**: Tell others about yourself
   - **Location**: City and country
   - **Phone**: Contact number

3. Click **"Update Profile"** to save changes

### Viewing Other Users

1. While browsing products, click **"View Seller"**
2. See their complete profile:
   - **About Section**: Bio, location, contact info
   - **Ratings & Reviews**: Their rating and trade history
   - **Products**: All their listed products

### Profile Statistics

Your profile shows:
- **Trading History**: Total completed trades
- **Rating**: Average rating from buyers/sellers
- **Account Type**: Seller, Buyer, or Both
- **Verification**: Your trustworthiness indicator

---

## ⭐ Rating & Review System

### How Ratings Work

- **Scale**: 1-5 stars
- **Based On**: Completed trades
- **Purpose**: Build trust and reputation

### Leaving Ratings

(Rating functionality available in the backend API)

1. After completing a trade
2. Rate the other user based on your experience
3. Your rating contributes to their profile

### Using Ratings

- Check seller ratings before buying
- Build your reputation as a seller
- Higher ratings = more opportunities

---

## 🔒 Security & Best Practices

### Protecting Your Account

✅ **DO:**
- Use a strong password (6+ chars, uppercase, numbers)
- Keep your login details private
- Update your profile information
- Review ratings before trading

❌ **DON'T:**
- Share your password
- Send money before matching
- Share personal details in messages
- Complete trades outside the platform

### Secure Trading

1. **Verify First**: Check seller/buyer ratings
2. **Communicate**: Use Messages to discuss details
3. **Meet Safely**: For in-person trades, meet in public places
4. **Confirm Details**: Verify product condition before payment
5. **Rate Honestly**: Leave honest reviews after trading

---

## 📱 Responsive Design

TradeMatch works on:
- **Desktop**: Full feature set
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface

---

## 🆘 Troubleshooting

### Can't Login?
- Check email and password are correct
- Try resetting password (check documentation)
- Ensure JavaScript is enabled in browser

### Products Not Showing?
- Refresh the page (F5 or Cmd+R)
- Check filters and search terms
- Ensure you're logged in

### Messages Not Appearing?
- Refresh the conversation
- Check for notification in browser
- Ensure other user is online

### Product Upload Failed?
- Check all required fields are filled
- Ensure price is a valid number
- Try again - there may be connection issue

---

## 📊 Account Types Explained

### **Seller**
- List products for sale
- Receive purchase inquiries
- Build seller rating
- Access seller dashboard

### **Buyer**
- Browse and search products
- Send interest notifications
- Message sellers
- Build buyer rating

### **Both**
- Full access to all features
- Can be both buyer and seller
- Most flexible option
- Recommended for most users

---

## 🎁 Feature Highlights

### Quick Features

| Feature | Description | Location |
|---------|-------------|----------|
| **Search** | Find products by keyword | Browse Products |
| **Filter** | Sort by price, rating, etc | Browse Products |
| **Match** | Connect with traders | Browse Products |
| **Chat** | Message with matches | Messages |
| **Rate** | Leave reviews | After Trade |
| **Profile** | Build reputation | My Profile |

### Smart Features

- ✅ Real-time messaging
- ✅ Automatic rating system
- ✅ Secure authentication
- ✅ User verification
- ✅ Trade history tracking
- ✅ Search & filtering
- ✅ Profile recommendations

---

## 🚀 Tips for Success

### For Sellers
1. ✍️ Write detailed product descriptions
2. 📸 Mention product condition clearly
3. 💬 Respond quickly to inquiries
4. ⭐ Build positive ratings
5. 📦 Be honest about product quality

### For Buyers
1. 🔍 Read product descriptions carefully
2. ⭐ Check seller ratings first
3. 💬 Ask questions before matching
4. 🤝 Negotiate respectfully
5. ⭐ Leave honest reviews

### For Everyone
1. 📝 Keep complete profile information
2. 🔐 Use secure passwords
3. ✅ Respond promptly to messages
4. 📍 Include location information
5. 🎯 Build community reputation

---

## 📞 Support & Help

For technical issues or questions:
1. Check this guide first
2. Review your profile and settings
3. Check API_TESTING.md for endpoint details
4. Refer to SETUP_GUIDE.md for installation help

---

## 🎯 Getting Started Checklist

- [ ] Register an account
- [ ] Complete your profile
- [ ] Add at least one product (if seller)
- [ ] Browse other products
- [ ] Send your first interest notification
- [ ] Exchange messages with a match
- [ ] Complete your first trade
- [ ] Leave a rating/review

---

## 📝 Additional Resources

- **QUICKSTART.md** - Quick setup guide
- **SETUP_GUIDE.md** - Detailed installation
- **API_TESTING.md** - For developers
- **README.md** - Full technical documentation

---

**Enjoy trading on TradeMatch! 🎉**

Build your reputation, find amazing deals, and connect with local traders today!
