import apiClient, { API_ENDPOINTS } from '../../config/api'

// Cart service with API integration
export const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.CART.GET)
      return response.data
    } catch (error) {
      console.warn('API not available, using local cart:', error.message)
      
      // Fallback to localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const userId = currentUser.id || 'guest'
      const cartKey = `cart_${userId}`
      const savedCart = localStorage.getItem(cartKey)
      
      return savedCart ? JSON.parse(savedCart) : []
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity, productData) => {
    try {
      // Try API first
      const response = await apiClient.post(API_ENDPOINTS.CART.ADD, {
        productId,
        quantity,
        productData
      })
      return response.data
    } catch (error) {
      console.warn('API not available, using local cart:', error.message)
      
      // Fallback to localStorage logic
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const userId = currentUser.id || 'guest'
      const cartKey = `cart_${userId}`
      
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]')
      const existingItem = existingCart.find(item => item.productId === productId)
      
      let updatedCart
      if (existingItem) {
        // Update quantity
        updatedCart = existingCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item
        const cartItem = {
          id: Date.now(),
          productId,
          title: productData.title,
          price: productData.price,
          image: productData.image,
          quantity,
          addedAt: new Date().toISOString()
        }
        updatedCart = [...existingCart, cartItem]
      }
      
      localStorage.setItem(cartKey, JSON.stringify(updatedCart))
      return updatedCart
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      // Try API first
      const response = await apiClient.put(API_ENDPOINTS.CART.UPDATE(itemId), { quantity })
      return response.data
    } catch (error) {
      console.warn('API not available, using local cart:', error.message)
      
      // Fallback to localStorage logic
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const userId = currentUser.id || 'guest'
      const cartKey = `cart_${userId}`
      
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]')
      const updatedCart = existingCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      
      localStorage.setItem(cartKey, JSON.stringify(updatedCart))
      return updatedCart
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      // Try API first
      await apiClient.delete(API_ENDPOINTS.CART.REMOVE(itemId))
      return { success: true }
    } catch (error) {
      console.warn('API not available, using local cart:', error.message)
      
      // Fallback to localStorage logic
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const userId = currentUser.id || 'guest'
      const cartKey = `cart_${userId}`
      
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]')
      const updatedCart = existingCart.filter(item => item.id !== itemId)
      
      localStorage.setItem(cartKey, JSON.stringify(updatedCart))
      return { success: true }
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      // Try API first
      await apiClient.delete(API_ENDPOINTS.CART.CLEAR)
      return { success: true }
    } catch (error) {
      console.warn('API not available, using local cart:', error.message)
      
      // Fallback to localStorage logic
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const userId = currentUser.id || 'guest'
      const cartKey = `cart_${userId}`
      
      localStorage.setItem(cartKey, JSON.stringify([]))
      return { success: true }
    }
  },

  // Sync local cart with server (useful after login)
  syncCart: async (localCartItems) => {
    try {
      const response = await apiClient.post('/cart/sync', { items: localCartItems })
      return response.data
    } catch (error) {
      console.warn('Cart sync not available:', error.message)
      return localCartItems
    }
  }
}