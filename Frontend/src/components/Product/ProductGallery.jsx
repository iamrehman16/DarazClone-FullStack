import styles from "./ProductGallery.module.css"

export default function ProductGallery({ image, title }) {
  return (
    <div className={styles.gallery}>
      <img src={image} alt={title} />
    </div>
  )
}
