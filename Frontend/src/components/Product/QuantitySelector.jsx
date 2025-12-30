import styles from "./QuantitySelector.module.css"

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className={styles.quantity}>
      <button onClick={onDecrease}>−</button>
      <span>{quantity}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  )
}
