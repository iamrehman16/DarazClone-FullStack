// Simple token management utilities
export const tokenManager = {
  // Get access token from localStorage
  getTokens: () => {
    const accessToken = localStorage.getItem('accessToken')
    return { accessToken }
  },

  // Set access token in localStorage
  setTokens: (accessToken) => {
    if (accessToken) localStorage.setItem('accessToken', accessToken)
  },

  // Clear token and session
  clearTokens: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('currentUser')
  },

  // Check if access token is expired or will expire soon (within 5 minutes)
  isTokenExpired: (token) => {
    if (!token) return true
    
    try {
      // Decode JWT payload (simple base64 decode)
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      const bufferTime = 5 * 60 // 5 minutes buffer
      
      return payload.exp < (currentTime + bufferTime)
    } catch (error) {
      console.warn('Error decoding token:', error)
      return true
    }
  },

  // Check if we have a valid access token
  hasValidTokens: () => {
    const { accessToken } = tokenManager.getTokens()
    return accessToken && !tokenManager.isTokenExpired(accessToken)
  }
} 