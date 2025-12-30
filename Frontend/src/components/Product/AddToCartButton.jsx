import styles from "./AddToCartButton.module.css"
import { useCart } from "../../Context/CartContext"

export default function AddToCartButton({ productId, onClick }) {
  const { isInCart } = useCart()
  const inCart = isInCart(productId)

  return (
    <button 
      className={`${styles.button} ${inCart ? styles.inCart : ''}`} 
      onClick={onClick}
    >
      {inCart ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  )
}
