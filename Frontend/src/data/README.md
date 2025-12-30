# Data Structure & API Integration

This directory contains the centralized data and API integration for the application.

## Files

- `mockData.json` - Mock data for development and fallback
- `../services/dataService.js` - Legacy service layer (now uses API services)
- `../services/userService.js` - Legacy user service (now uses API services)
- `../services/api/` - Modern API service layer with backend integration
- `../Context/CartContext.jsx` - Cart state management
- `../Context/AuthContext.jsx` - Authentication state management
- `../config/api.js` - Axios configuration and API endpoints

## 🚀 Backend Integration

### Quick Start
1. Set your API URL in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```
2. Start your backend server
3. The app automatically uses your API!

### API Services Architecture

```
Components → Legacy Services → API Services → Backend API
                                         ↓
                                   Mock Data (fallback)
```

### Automatic Fallback System
- **API First**: All services try your backend API
- **Graceful Fallback**: Uses mock data if API unavailable  
- **Development Friendly**: Console warnings when using fallbacks
- **Production Ready**: Disable fallbacks in production

## Data Structure

### Products
```json
{
  "id": number,
  "title": string,
  "description": string,
  "price": number,
  "discount": number,
  "rating": number,
  "reviews": number,
  "image": string,
  "category": string
}
```

### Categories
```json
{
  "id": number,
  "name": string,
  "image": string
}
```

### Users
```json
{
  "id": string,
  "name": string,
  "email": string,
  "createdAt": string,
  "avatar": string | null
}
```

### Cart Items
```json
{
  "id": number,
  "productId": number,
  "title": string,
  "price": number,
  "image": string,
  "quantity": number,
  "addedAt": string
}
```

## Usage

### Legacy Services (Still Work!)
```javascript
import { dataService } from '../services/dataService'
import { userService } from '../services/userService'

// These now use API services under the hood
const products = await dataService.getAllProducts()
const user = await userService.login(credentials)
```

### Modern API Services
```javascript
import { productService, authService } from '../services/api'

// Direct API service usage
const products = await productService.getAllProducts()
const user = await authService.login(credentials)
```

### Authentication
```javascript
import { useAuth } from '../Context/AuthContext'

const { 
  user,           // Current user object
  loading,        // Auth loading state
  login,          // Login function
  signup,         // Signup function
  logout,         // Logout function
  updateProfile,  // Update user profile
  isAuthenticated // Check if user is logged in
} = useAuth()
```

### Cart Management
```javascript
import { useCart } from '../Context/CartContext'

const { 
  cartItems, 
  addToCart, 
  updateItemQuantity,
  removeFromCart,
  clearCart,
  getCartTotal,
  getCartItemCount,
  isInCart 
} = useCart()
```

## 🔧 API Endpoints Expected

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/profile`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/category/:category`
- `GET /api/products/featured`
- `GET /api/products/search`

### Categories
- `GET /api/categories`
- `GET /api/categories/:id`

### Cart (Optional)
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/items/:itemId`
- `DELETE /api/cart/items/:itemId`

## 🛠️ Features

### Current Implementation
- ✅ **API-First Architecture** with graceful fallbacks
- ✅ **JWT Authentication** with automatic token handling
- ✅ **Async Data Loading** with loading states
- ✅ **Error Handling** with user-friendly messages
- ✅ **User-Specific Carts** with localStorage backup
- ✅ **Protected Routes** with authentication
- ✅ **Session Persistence** across browser sessions
- ✅ **CORS Support** and request interceptors

### Mock Data Features
- Demo users pre-loaded for testing
- Realistic product and category data
- Automatic fallback when API unavailable
- Development-friendly console warnings

## 📚 Documentation

- **[API Integration Guide](../docs/API_INTEGRATION.md)** - Complete backend integration guide
- **Request/Response formats** - Expected API contracts
- **Authentication flow** - JWT token handling
- **Error handling** - Graceful degradation strategies
- **Deployment checklist** - Production readiness guide

## 🧪 Testing

### Demo Accounts
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

### API Testing
1. Start your backend on configured port
2. Check browser console for API calls
3. Test authentication flow
4. Verify data loading from your API
5. Test error handling (stop backend)

## 🚀 Production Deployment

### Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_NODE_ENV=production
```

### Backend Requirements
- All API endpoints implemented
- CORS configured for your domain
- JWT authentication working
- Proper error responses with status codes

The app is now **100% backend-ready** - just plug in your API! 🎉