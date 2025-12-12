# TradeMatch API Test Examples

This document contains example API calls for testing all TradeMatch endpoints.

## Prerequisites

- Backend running on `http://localhost:3000`
- Postman or curl installed
- MySQL database initialized with schema

## Authentication Endpoints

### 1. Register New User

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123",
    "username": "johndoe",
    "full_name": "John Doe",
    "user_type": "both"
  }'
```

**Expected Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "full_name": "John Doe",
    "user_type": "both"
  }
}
```

### 2. Login User

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**Expected Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "full_name": "John Doe",
    "user_type": "both"
  }
}
```

## User Endpoints

**Note:** All user endpoints require authorization header:
```
Authorization: Bearer <token>
```

### 3. Get Current User Profile

**Request:**
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "full_name": "John Doe",
    "user_type": "both",
    "profile_image": null,
    "bio": null,
    "location": null,
    "phone": null,
    "rating": 0,
    "total_trades": 0,
    "created_at": "2024-12-09T10:30:00.000Z"
  }
}
```

### 4. Update User Profile

**Request:**
```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Smith",
    "bio": "Experienced seller and buyer",
    "location": "New York, USA",
    "phone": "+1-555-123-4567"
  }'
```

**Expected Response (200 OK):**
```json
{
  "message": "Profile updated",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "full_name": "John Smith",
    "user_type": "both",
    "profile_image": null,
    "bio": "Experienced seller and buyer",
    "location": "New York, USA",
    "phone": "+1-555-123-4567"
  }
}
```

### 5. Get User by ID

**Request:**
```bash
curl -X GET http://localhost:3000/api/users/1
```

**Expected Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "full_name": "John Smith",
    "user_type": "both",
    "profile_image": null,
    "bio": "Experienced seller and buyer",
    "location": "New York, USA",
    "phone": "+1-555-123-4567",
    "rating": 4.5,
    "total_trades": 12,
    "created_at": "2024-12-09T10:30:00.000Z",
    "products": [
      {
        "id": 1,
        "title": "iPhone 13",
        "price": 699.99,
        "category": "Electronics"
      }
    ],
    "ratings_count": 8,
    "ratings": [
      {
        "id": 1,
        "rating": 5,
        "review": "Great seller!",
        "created_at": "2024-12-08T15:20:00.000Z"
      }
    ]
  }
}
```

## Product Endpoints

### 6. Get My Products

**Request:**
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response (200 OK):**
```json
{
  "products": [
    {
      "id": 1,
      "user_id": 1,
      "title": "iPhone 13",
      "description": "Excellent condition, barely used",
      "category": "Electronics",
      "price": 699.99,
      "currency": "USD",
      "product_image": "https://example.com/image.jpg",
      "is_available": true,
      "quantity_available": 1,
      "created_at": "2024-12-09T10:30:00.000Z"
    }
  ]
}
```

### 7. Create Product

**Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "MacBook Pro 14-inch",
    "description": "2023 model, M3 Pro, excellent condition",
    "category": "Electronics",
    "price": 1999.99,
    "currency": "USD",
    "quantity_available": 1
  }'
```

**Expected Response (201 Created):**
```json
{
  "message": "Product created",
  "product": {
    "id": 2,
    "user_id": 1,
    "title": "MacBook Pro 14-inch",
    "description": "2023 model, M3 Pro, excellent condition",
    "category": "Electronics",
    "price": 1999.99,
    "currency": "USD",
    "product_image": null,
    "quantity_available": 1
  }
}
```

### 8. Get Product Details

**Request:**
```bash
curl -X GET http://localhost:3000/api/products/1
```

**Expected Response (200 OK):**
```json
{
  "product": {
    "id": 1,
    "user_id": 1,
    "title": "iPhone 13",
    "description": "Excellent condition, barely used",
    "category": "Electronics",
    "price": 699.99,
    "currency": "USD",
    "product_image": "https://example.com/image.jpg",
    "is_available": true,
    "quantity_available": 1,
    "created_at": "2024-12-09T10:30:00.000Z",
    "username": "johndoe",
    "full_name": "John Smith",
    "rating": 4.5
  }
}
```

### 9. Browse Products

**Request:**
```bash
curl -X GET "http://localhost:3000/api/products/browse?category=Electronics&search=iPhone&limit=10&offset=0"
```

**Expected Response (200 OK):**
```json
{
  "products": [
    {
      "id": 1,
      "user_id": 1,
      "title": "iPhone 13",
      "description": "Excellent condition, barely used",
      "category": "Electronics",
      "price": 699.99,
      "currency": "USD",
      "is_available": true,
      "username": "johndoe",
      "full_name": "John Smith",
      "rating": 4.5
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 10,
    "offset": 0,
    "hasMore": false
  }
}
```

### 10. Update Product

**Request:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "price": 649.99,
    "description": "Reduced price for quick sale"
  }'
```

**Expected Response (200 OK):**
```json
{
  "message": "Product updated"
}
```

### 11. Delete Product

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/products/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response (200 OK):**
```json
{
  "message": "Product deleted"
}
```

## Matching Endpoints

### 12. Get Matches

**Request:**
```bash
curl -X GET http://localhost:3000/api/matches \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response (200 OK):**
```json
{
  "matches": [
    {
      "id": 1,
      "user_id_1": 1,
      "user_id_2": 2,
      "product_id": 5,
      "match_type": "interest",
      "status": "pending",
      "created_at": "2024-12-09T10:30:00.000Z",
      "matched_user": "janedoe",
      "matched_user_id": 2
    }
  ]
}
```

### 13. Create Match

**Request:**
```bash
curl -X POST http://localhost:3000/api/matches \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "other_user_id": 2,
    "product_id": 5,
    "match_type": "interest"
  }'
```

**Expected Response (201 Created):**
```json
{
  "message": "Match created",
  "match_id": 1
}
```

### 14. Update Match Status

**Request:**
```bash
curl -X PUT http://localhost:3000/api/matches/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "status": "accepted"
  }'
```

**Expected Response (200 OK):**
```json
{
  "message": "Match status updated"
}
```

## Messaging Endpoints

### 15. Get Messages

**Request:**
```bash
curl -X GET "http://localhost:3000/api/messages?match_id=1&limit=50&offset=0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response (200 OK):**
```json
{
  "messages": [
    {
      "id": 1,
      "sender_id": 1,
      "receiver_id": 2,
      "match_id": 1,
      "message_text": "Hi, are you interested in trading?",
      "is_read": false,
      "created_at": "2024-12-09T10:30:00.000Z"
    }
  ]
}
```

### 16. Send Message

**Request:**
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_id": 2,
    "message_text": "Hi, I'm interested in your product!",
    "match_id": 1
  }'
```

**Expected Response (201 Created):**
```json
{
  "message": "Message sent",
  "message_id": 1
}
```

## Rating Endpoints

### 17. Get User Ratings

**Request:**
```bash
curl -X GET "http://localhost:3000/api/ratings?user_id=1"
```

**Expected Response (200 OK):**
```json
{
  "ratings": [
    {
      "id": 1,
      "rater_id": 2,
      "rated_user_id": 1,
      "rating": 5,
      "review": "Excellent seller! Fast response and great quality",
      "match_id": 1,
      "created_at": "2024-12-08T15:20:00.000Z",
      "username": "janedoe",
      "full_name": "Jane Doe"
    }
  ]
}
```

### 18. Create Rating

**Request:**
```bash
curl -X POST http://localhost:3000/api/ratings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "rated_user_id": 2,
    "rating": 5,
    "review": "Great trader! Highly recommend",
    "match_id": 1
  }'
```

**Expected Response (201 Created):**
```json
{
  "message": "Rating created",
  "rating_id": 1
}
```

## Common HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource not found |
| 405 | Method Not Allowed - Wrong HTTP method |
| 500 | Internal Server Error - Server error |

## Testing Workflow

1. Register a new user (endpoint 1)
2. Login (endpoint 2)
3. Update profile (endpoint 4)
4. Create a product (endpoint 7)
5. Browse products (endpoint 9)
6. Create a match with another user (endpoint 13)
7. Update match status (endpoint 14)
8. Send a message (endpoint 16)
9. Create a rating (endpoint 18)

## Postman Collection

You can import these requests into Postman for easier testing. Create a new collection and add the requests above as separate requests.
