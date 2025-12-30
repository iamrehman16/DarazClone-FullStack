# API Integration Guide

This document explains how to integrate your backend API with the frontend application.

## 🚀 Quick Start

1. **Set your API URL** in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

2. **Start your backend server** on the configured port

3. **The app will automatically use your API** - no code changes needed!

## 📡 API Endpoints Expected

### Authentication Endpoints

```
POST /api/auth/login
POST /api/auth/register  
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/profile
PUT  /api/user/profile
```

### Product Endpoints

```
GET  /api/products
GET  /api/products/:id
GET  /api/products/category/:category
GET  /api/products/featured
GET  /api/products/search?q=query
```

### Category Endpoints

```
GET  /api/categories
GET  /api/categories/:id
```

### Cart Endpoints (Optional - can use localStorage)

```
GET    /api/cart
POST   /api/cart/add
PUT    /api/cart/items/:itemId
DELETE /api/cart/items/:itemId
DELETE /api/cart/clear
POST   /api/cart/sync
```

## 📋 Request/Response Formats

### Authentication

#### Login Request
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login Response
```json
{
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt_access_token_here",
  "refreshToken": "jwt_refresh_token_here"
}
```

#### Register Response
```json
{
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt_access_token_here",
  "refreshToken": "jwt_refresh_token_here"
}
```

#### Refresh Token Request
```json
POST /api/auth/refresh
{
  "refreshToken": "jwt_refresh_token_here"
}
```

#### Refresh Token Response
```json
{
  "accessToken": "new_jwt_access_token_here",
  "refreshToken": "new_jwt_refresh_token_here" // Optional: rotate refresh token
}
```

#### Register Request
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "user@example.com", 
  "password": "password123"
}
```

### Products

#### Products List Response
```json
GET /api/products
[
  {
    "id": 1,
    "title": "Samsung Galaxy A15",
    "description": "6GB RAM, 128GB Storage",
    "price": 42000,
    "discount": 15,
    "rating": 4.3,
    "reviews": 128,
    "image": "/assets/sample-product.jpg",
    "category": "Mobile Phones"
  }
]
```

#### Product Detail Response
```json
GET /api/products/1
{
  "id": 1,
  "title": "Samsung Galaxy A15",
  "description": "6GB RAM, 128GB Storage",
  "price": 42000,
  "discount": 15,
  "rating": 4.3,
  "reviews": 128,
  "image": "/assets/sample-product.jpg",
  "category": "Mobile Phones"
}
```

### Categories

#### Categories List Response
```json
GET /api/categories
[
  {
    "id": 1,
    "name": "Mobile Phones",
    "image": "/assets/mobile-category.jpg"
  }
]
```

### Cart (Optional)

#### Add to Cart Request
```json
POST /api/cart/add
{
  "productId": 1,
  "quantity": 2,
  "productData": {
    "title": "Samsung Galaxy A15",
    "price": 35700,
    "image": "/assets/sample-product.jpg"
  }
}
```

#### Cart Response
```json
GET /api/cart
[
  {
    "id": 1,
    "productId": 1,
    "title": "Samsung Galaxy A15",
    "price": 35700,
    "image": "/assets/sample-product.jpg",
    "quantity": 2,
    "addedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

## 🔧 How It Works

### Automatic Fallback System

The app uses a **graceful degradation** approach:

1. **Try API first** - All services attempt to call your backend API
2. **Fallback to mock data** - If API fails, uses local mock data
3. **Console warnings** - Logs when using fallback data

### Service Layer Architecture

```
Components → Services → API Services → Backend API
                    ↓
                Mock Data (fallback)
```

### Example Service Flow

```javascript
// 1. Component calls service
const products = await dataService.getAllProducts()

// 2. Service calls API service  
export const dataService = {
  getAllProducts: () => productService.getAllProducts()
}

// 3. API service tries backend, falls back to mock
export const productService = {
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/products')
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data')
      return mockData.products
    }
  }
}
```

## 🔐 Authentication Integration

### JWT Token Handling

The app now has **complete JWT token management**:

1. **Dual Token Storage** - Stores both access and refresh tokens
2. **Automatic Refresh** - Refreshes tokens before they expire (5-minute buffer)
3. **Request Queuing** - Queues failed requests during token refresh
4. **Token Validation** - Checks token expiry before each request
5. **Fallback Handling** - Auto-logout if refresh fails

### Headers Sent

```javascript
Authorization: Bearer your_jwt_access_token_here
Content-Type: application/json
```

### Token Refresh Flow

1. **Before Request** - Check if access token expires within 5 minutes
2. **Auto Refresh** - Use refresh token to get new access token
3. **Update Storage** - Store new tokens in localStorage
4. **Retry Request** - Continue with original request using new token
5. **Queue Management** - Handle multiple simultaneous requests during refresh

## 🛠️ Development vs Production

### Development Mode
- Uses mock data fallback
- Shows console warnings
- Graceful error handling

### Production Mode
- Set `VITE_NODE_ENV=production`
- Can disable mock fallbacks
- Enhanced error reporting

## 📝 Error Handling

### API Errors Handled

- **401 Unauthorized** - Auto logout and redirect to login
- **403 Forbidden** - Access denied message
- **404 Not Found** - Fallback to mock data
- **500+ Server Errors** - Error logging and fallback

### Custom Error Responses

Your API can return custom error messages:

```json
{
  "error": "Custom error message",
  "code": "CUSTOM_ERROR_CODE"
}
```

## 🚀 Deployment Checklist

### Frontend Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_NODE_ENV=production
```

### Backend Requirements
- CORS enabled for your frontend domain
- JWT authentication implemented
- All endpoints listed above implemented
- Proper error responses with status codes

### Optional Enhancements
- Rate limiting
- Request/response compression
- API versioning
- Health check endpoint (`/api/health`)

## 🔍 Testing Your Integration

1. **Start your backend** on the configured port
2. **Check browser console** - should see API calls instead of "using mock data"
3. **Test authentication** - login/logout should work with your backend
4. **Test data loading** - products/categories should load from your API
5. **Test error handling** - stop backend, should fallback gracefully

## 📞 Support

If you need help integrating your backend:

1. Check browser console for error messages
2. Verify your API endpoints match the expected format
3. Test endpoints directly with Postman/curl
4. Ensure CORS is properly configured

The frontend is designed to work with any backend that follows REST conventions!