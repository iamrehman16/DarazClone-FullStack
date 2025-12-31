import styles from "./ProductInfo.module.css"

export default function ProductInfo({
  title,
  description,
  rating,
  reviews,
  price,
  discount,
  off,
}) {
  // Normalize numeric inputs and support both `discount` and legacy `off` prop
  const priceNum = Number(price) || 0
  const offValue = typeof discount !== "undefined" ? Number(discount) : Number(off) || 0
  const discountedPrice = Math.round(priceNum - (priceNum * offValue) / 100)

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
        {offValue > 0 && <span className={styles.off}>-{offValue}%</span>}
      </div>
    </div>
  )
}
