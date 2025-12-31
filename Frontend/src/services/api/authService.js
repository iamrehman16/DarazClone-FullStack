import apiClient, { API_ENDPOINTS } from '../../config/api'
import { tokenManager } from '../../utils/tokenManager'
import { demoUsers } from '../../data/demoUsers'

// Authentication service with API integration
export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      // Try API first
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
      
      // Store token (API returns only accessToken)
      const { accessToken, token } = response.data
      tokenManager.setTokens(accessToken || token)
      
      // Store user data
      localStorage.setItem('currentUser', JSON.stringify(response.data.user))
      
      return response.data.user
    } catch (error) {
      console.warn('API not available, using mock authentication:', error.message)
      
      // Fallback to mock authentication
      const { email, password } = credentials
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get users from localStorage (includes demo users)
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const allUsers = [...demoUsers, ...users]
      
      // Find user
      const user = allUsers.find(u => u.email === email)
      
      if (!user) {
        throw new Error('User not found')
      }
      
      if (user.password !== password) {
        throw new Error('Invalid password')
      }
      
      // Don't store password in session
      const { password: _, ...userWithoutPassword } = user
      
      // Create mock access token
      const mockAccessToken = btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
      }))
      
      // Store token
      tokenManager.setTokens(mockAccessToken)
      
      // Save user to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      
      return userWithoutPassword
    }
  },

  // Register user
  register: async (userData) => {
    try {
      // Try API first
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
      
      // Store token (API returns only accessToken)
      const { accessToken, token } = response.data
      tokenManager.setTokens(accessToken || token)
      
      // Store user data
      localStorage.setItem('currentUser', JSON.stringify(response.data.user))
      
      return response.data.user
    } catch (error) {
      console.warn('API not available, using mock registration:', error.message)
      
      // Fallback to mock registration
      const { name, email, password } = userData
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const allUsers = [...demoUsers, ...users]
      
      // Check if user already exists
      if (allUsers.find(u => u.email === email)) {
        throw new Error('User already exists with this email')
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app, this would be hashed
        createdAt: new Date().toISOString(),
        avatar: null
      }
      
      // Add to mock database
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      // Don't store password in session
      const { password: _, ...userWithoutPassword } = newUser
      
      // Create mock tokens
      const mockAccessToken = btoa(JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
      }))
      
      // Store token
      tokenManager.setTokens(mockAccessToken)
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      
      return userWithoutPassword
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Try API first
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.warn('API not available for logout:', error.message)
    } finally {
      // Always clear local storage
      tokenManager.clearTokens()
    }
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser')
    if (userStr) {
      return JSON.parse(userStr)
    }
    // Return guest user if no one is logged in
    return {
      id: 'guest',
      name: 'Guest User',
      email: null,
      isGuest: true
    }
  },

  // Update user profile
  updateProfile: async (updates) => {
    try {
      // Try API first
      const response = await apiClient.put(API_ENDPOINTS.USER.UPDATE_PROFILE, updates)
      
      // Update local storage
      localStorage.setItem('currentUser', JSON.stringify(response.data.user))
      
      return response.data.user
    } catch (error) {
      console.warn('API not available, using mock profile update:', error.message)
      
      // Fallback to mock update
      const currentUser = authService.getCurrentUser()
      
      if (currentUser.isGuest) {
        throw new Error('Guest users cannot update profile')
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update user in mock database
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex(u => u.id === currentUser.id)
      
      if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...updates }
        users[userIndex] = updatedUser
        localStorage.setItem('users', JSON.stringify(users))
        
        // Don't store password in session
        const { password: _, ...userWithoutPassword } = updatedUser
        
        // Update current user session
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
        
        return userWithoutPassword
      }
      
      throw new Error('User not found')
    }
  },

  // Check if user is authenticated with valid tokens
  isAuthenticated: () => {
    const user = authService.getCurrentUser()
    return user && !user.isGuest && tokenManager.hasValidTokens()
  },


}