import styles from "./HeroSlider.module.css"
import image from "../../assets/image.png"

export default function HeroSlider() {
  return (
    <div className={styles.hero}>
      {/* Single slide example */}
      <div className={styles.slide}>
        <img src={image} alt="Banner" className={styles.img} />
      </div>
    </div>
  )
}
