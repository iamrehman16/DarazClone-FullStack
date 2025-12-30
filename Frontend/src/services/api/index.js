// Unified API service exports
export { productService } from './productService'
export { categoryService } from './categoryService'
export { authService } from './authService'
export { cartService } from './cartService'

// Re-export API client and endpoints for direct use
export { default as apiClient, API_ENDPOINTS } from '../../config/api'

// API status checker
export const checkApiStatus = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/health`)
    return response.ok
  } catch (error) {
    return false
  }
}