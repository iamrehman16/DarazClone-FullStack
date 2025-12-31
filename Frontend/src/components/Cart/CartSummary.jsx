import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./CartSummary.module.css"

export default function CartSummary({ total }) {
  const [processing, setProcessing] = useState(false)
  const [placed, setPlaced] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (processing || placed) return
    setProcessing(true)

    // Simulate processing and show success message
    setTimeout(() => {
      setProcessing(false)
      setPlaced(true)

      // Show message briefly then redirect to home
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1000)
    }, 700)
  }

  return (
    <div className={styles.summary}>
      <h3>Order Summary</h3>

      <div className={styles.row}>
        <span>Total</span>
        <strong>Rs. {total}</strong>
      </div>

      <button
        className={styles.checkout}
        onClick={handleCheckout}
        disabled={processing || placed}
      >
        {placed ? 'Order Placed' : (processing ? 'Processing...' : 'Proceed to Payment')}
      </button>

      {placed && (
        <div className={styles.successMessage}>Order Placed</div>
      )}
    </div>
  )
} 
