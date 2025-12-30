import axios from 'axios'
import { tokenManager } from '../utils/tokenManager'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Flag to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue = []

// Process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  
  failedQueue = []
}

// Request interceptor to add auth token and check expiry
apiClient.interceptors.request.use(
  async (config) => {
    const { accessToken } = tokenManager.getTokens()
    
    if (accessToken) {
      // Check if token is expired and refresh if needed
      if (tokenManager.isTokenExpired(accessToken)) {
        if (!isRefreshing) {
          isRefreshing = true
          
          try {
            const { refreshToken } = tokenManager.getTokens()
            if (refreshToken) {
              // Call refresh endpoint
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              })
              
              const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
              tokenManager.setTokens(newAccessToken, newRefreshToken)
              
              processQueue(null, newAccessToken)
              config.headers.Authorization = `Bearer ${newAccessToken}`
            } else {
              throw new Error('No refresh token available')
            }
          } catch (error) {
            processQueue(error, null)
            tokenManager.clearTokens()
            window.location.href = '/login'
            return Promise.reject(error)
          } finally {
            isRefreshing = false
          }
        } else {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          }).then(token => {
            config.headers.Authorization = `Bearer ${token}`
            return config
          })
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        }).catch(err => {
          return Promise.reject(err)
        })
      }
      
      originalRequest._retry = true
      isRefreshing = true
      
      try {
        const { refreshToken } = tokenManager.getTokens()
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          })
          
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
          tokenManager.setTokens(newAccessToken, newRefreshToken)
          
          processQueue(null, newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          
          return apiClient(originalRequest)
        } else {
          throw new Error('No refresh token available')
        }
      } catch (refreshError) {
        processQueue(refreshError, null)
        tokenManager.clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    
    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Access forbidden')
    }
    
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data)
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
    BY_CATEGORY: (category) => `/products/category/${category}`,
    FEATURED: '/products/featured',
    SEARCH: '/products/search',
  },
  
  // Categories
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id) => `/categories/${id}`,
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (itemId) => `/cart/items/${itemId}`,
    REMOVE: (itemId) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear',
  },
  
  // Orders
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: (id) => `/orders/${id}`,
  },
  
  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
  }
}