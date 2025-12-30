import styles from "./ProductCard.module.css"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

export default function ProductCard({
  image,
  title,
  description,
  price,
  discount, // in percentage
  rating, // 0-5
  reviews, // number of reviews
  onClick
}) {
  const fullStars = Math.floor(rating)
  const halfStar = rating - fullStars >= 0.5

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        {discount && <span className={styles.discount}>{discount}% OFF</span>}
        <img src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.priceSection}>
          <span className={styles.price}>${price}</span>
        </div>

        <div className={styles.ratingSection}>
          {[...Array(5)].map((_, index) => {
            if (index < fullStars) return <AiFillStar key={index} color="#FFD700" />
            return <AiOutlineStar key={index} color="#FFD700" />
          })}
          <span className={styles.reviews}>({reviews} reviews)</span>
        </div>
      </div>
    </div>
  )
}
