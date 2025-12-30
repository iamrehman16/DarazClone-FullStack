import { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
import { useCart } from '../Context/CartContext'

// Custom hook to sync cart when user changes
export const useCartSync = () => {
  const { user } = useAuth()
  const { switchUserCart } = useCart()

  useEffect(() => {
    // Switch cart whenever user changes (login/logout)
    if (switchUserCart) {
      switchUserCart()
    }
  }, [user, switchUserCart])
}