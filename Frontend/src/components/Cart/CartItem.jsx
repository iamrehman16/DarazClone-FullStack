import styles from "./CartItem.module.css"

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, title, price, quantity, image } = item

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />

      <div className={styles.info}>
        <h4>{title}</h4>
        <p>Rs. {price}</p>

        <div className={styles.quantity}>
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.total}>
        Rs. {price * quantity}
      </div>

      <button 
        className={styles.removeBtn}
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  )
}
