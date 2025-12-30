import { useState, useEffect } from "react"
import styles from "./Categories.module.css"
import CategoryCard from "./CategoryCard/CategoryCard.jsx"
import { dataService } from "../../services/dataService"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true)
        const categoriesData = await dataService.getAllCategories()
        setCategories(categoriesData)
      } catch (err) {
        setError('Failed to load categories')
        console.error('Error loading categories:', err)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Shop by Category</h2>
        </div>
        <div className={styles.loading}>Loading categories...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Shop by Category</h2>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Shop by Category</h2>
      </div>
      <div className={styles.categoryGrid}>
        {categories.map((cat) => (
          <CategoryCard key={cat.id} image={cat.image} category={cat.name} />
        ))}
      </div>
    </div>
  )
}