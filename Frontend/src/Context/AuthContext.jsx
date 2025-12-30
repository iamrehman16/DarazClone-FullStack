import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/api/authService"
import { tokenManager } from "../utils/tokenManager"
import { initializeDemoUsers } from "../data/demoUsers"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Initialize demo users for testing
        initializeDemoUsers()
        
        const savedUser = authService.getCurrentUser()
        
        // Check if user has valid tokens
        if (savedUser && savedUser.id !== 'guest' && tokenManager.hasValidTokens()) {
          setUser(savedUser)
        } else if (savedUser && savedUser.id !== 'guest') {
          // User exists but tokens are invalid, clear session
          tokenManager.clearTokens()
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        tokenManager.clearTokens()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const user = await authService.login(credentials)
      setUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    try {
      setLoading(true)
      const user = await authService.register(userData)
      setUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  const updateProfile = async (updates) => {
    try {
      const updatedUser = await authService.updateProfile(updates)
      setUser(updatedUser)
      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const isAuthenticated = () => {
    return user && user.id !== 'guest' && tokenManager.hasValidTokens()
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}