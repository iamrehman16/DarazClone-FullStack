import styles from "./CartSummary.module.css"

export default function CartSummary({ total }) {
  return (
    <div className={styles.summary}>
      <h3>Order Summary</h3>

      <div className={styles.row}>
        <span>Total</span>
        <strong>Rs. {total}</strong>
      </div>

      <button className={styles.checkout}>
        Proceed to Payment
      </button>
    </div>
  )
}
