import styles from "./CategoryCard.module.css"
import { useNavigate } from "react-router-dom"

export default function CategoryCard({ image, category }) {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/category/${encodeURIComponent(category)}`)
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img src={image} alt={category} className={styles.image} />
      </div>
      <div className={styles.category}>{category}</div>
    </div>
  )
}
