import { authService } from './api/authService'

// Legacy userService - now uses API service
export const userService = {
  // Get current user
  getCurrentUser: () => authService.getCurrentUser(),

  // Login user
  login: (credentials) => authService.login(credentials),

  // Register user
  register: (userData) => authService.register(userData),

  // Logout user
  logout: () => authService.logout(),

  // Update user profile
  updateProfile: (updates) => authService.updateProfile(updates),

  // Get user-specific cart key for localStorage
  getCartKey: () => {
    const user = authService.getCurrentUser()
    return `cart_${user.id}`
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Validate password strength
  isValidPassword: (password) => {
    return password && password.length >= 6
  }
}