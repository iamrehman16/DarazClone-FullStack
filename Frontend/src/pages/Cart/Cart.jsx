import styles from "./Cart.module.css"
import { useCart } from "../../Context/CartContext.jsx"
import CartItem from "../../components/Cart/CartItem"
import CartSummary from "../../components/cart/CartSummary"

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>

      <div className={styles.content}>
        {/* Left side: Cart Items */}
        <div className={styles.items}>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateItemQuantity}
                onRemove={removeFromCart}
              />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        {/* Right side: Cart Summary */}
        <CartSummary total={getCartTotal()} />
      </div>
    </div>
  )
}
