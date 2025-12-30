import styles from "./ProductInfo.module.css"

export default function ProductInfo({
  title,
  description,
  rating,
  reviews,
  price,
  off,
}) {
  const discountedPrice = Math.round(price - (price * off) / 100)

  return (
    <div className={styles.info}>
      <h1>{title}</h1>
      <p>{description}</p>

      <div className={styles.rating}>
        ⭐ {rating} <span>({reviews} reviews)</span>
      </div>

      <div className={styles.priceBox}>
        <span className={styles.discounted}>Rs. {discountedPrice}</span>
        <span className={styles.original}>Rs. {price}</span>
        <span className={styles.off}>-{off}%</span>
      </div>
    </div>
  )
}
