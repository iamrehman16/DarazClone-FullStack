import { createContext, useContext, useState, useEffect } from "react"
import { userService } from "../services/userService"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null)

  // Function to load cart for current user
  const loadUserCart = () => {
    const user = userService.getCurrentUser()
    const cartKey = userService.getCartKey()
    const savedCart = localStorage.getItem(cartKey)
    const userCart = savedCart ? JSON.parse(savedCart) : []
    
    setCartItems(userCart)
    setCurrentUserId(user.id)
  }

  // Load cart on initialization
  useEffect(() => {
    loadUserCart()
  }, [])

  // Function to switch user cart (called from AuthContext)
  const switchUserCart = () => {
    const user = userService.getCurrentUser()
    
    // Only switch if user actually changed
    if (user.id !== currentUserId) {
      loadUserCart()
    }
  }

  // Save cart to localStorage whenever cart items change
  useEffect(() => {
    if (currentUserId) {
      const cartKey = userService.getCartKey()
      localStorage.setItem(cartKey, JSON.stringify(cartItems))
    }
  }, [cartItems, currentUserId])

  const addToCart = (product, quantity) => {
    console.log("addToCart called", product, quantity)

    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id)

      if (existing) {
        // Update quantity for existing item
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      // Add new item to cart
      const cartItem = {
        id: Date.now(), // Unique cart item ID
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        addedAt: new Date().toISOString()
      }

      return [...prev, cartItem]
    })
  }

  const updateItemQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId)
      return
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === cartItemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.productId === productId)
  }

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        updateItemQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isInCart,
        switchUserCart // Expose this for AuthContext to call
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
