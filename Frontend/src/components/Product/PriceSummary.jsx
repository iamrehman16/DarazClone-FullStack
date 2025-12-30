import styles from "./PriceSummary.module.css"

export default function PriceSummary({ price, quantity }) {
  return (
    <div className={styles.total}>
      Total: <strong>Rs. {price * quantity}</strong>
    </div>
  )
}
