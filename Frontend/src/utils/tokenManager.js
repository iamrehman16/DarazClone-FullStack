// Simple token management utilities
export const tokenManager = {
  // Get tokens from localStorage
  getTokens: () => {
    const accessToken = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken')
    return { accessToken, refreshToken }
  },

  // Set tokens in localStorage
  setTokens: (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem('authToken', accessToken)
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
  },

  // Clear all tokens
  clearTokens: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
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

  // Check if we have valid tokens
  hasValidTokens: () => {
    const { accessToken, refreshToken } = tokenManager.getTokens()
    return accessToken && refreshToken && !tokenManager.isTokenExpired(accessToken)
  }
}