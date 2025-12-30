import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { useAuth } from "../../Context/AuthContext"
import { useCart } from "../../Context/CartContext"
import styles from "./UserMenu.module.css"

export default function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartItemCount } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const cartItemCount = getCartItemCount()

  if (!isAuthenticated()) {
    return (
      <div className={styles.authSection}>
        <Link to="/login" className={styles.actionBtn}>
          <AiOutlineUser size={20} />
          <span>Login/SignUp</span>
        </Link>
        
        <Link to="/cart" className={styles.cartBtn}>
          <AiOutlineShoppingCart size={22} />
          {cartItemCount > 0 && (
            <span className={styles.cartCount}>{cartItemCount}</span>
          )}
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.userSection}>
      <div className={styles.userMenu} ref={menuRef}>
        <button 
          className={styles.userButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.arrow}>▼</span>
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            <Link 
              to="/profile" 
              className={styles.dropdownItem}
              onClick={() => setIsOpen(false)}
            >
              My Profile
            </Link>
            <Link 
              to="/cart" 
              className={styles.dropdownItem}
              onClick={() => setIsOpen(false)}
            >
              My Cart ({cartItemCount})
            </Link>
            <hr className={styles.divider} />
            <button 
              className={styles.logoutItem}
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
      
      <Link to="/cart" className={styles.cartBtn}>
        <AiOutlineShoppingCart size={22} />
        {cartItemCount > 0 && (
          <span className={styles.cartCount}>{cartItemCount}</span>
        )}
      </Link>
    </div>
  )
}