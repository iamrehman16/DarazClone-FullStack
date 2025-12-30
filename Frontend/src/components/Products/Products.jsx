import { useState, useEffect } from "react"
import styles from "./Products.module.css"
import ProductCard from "./ProdutCard/ProductCard"
import { useNavigate } from "react-router-dom"
import { dataService } from "../../services/dataService"

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const featuredProducts = await dataService.getFeaturedProducts()
        setProducts(featuredProducts)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Featured Products</h2>
        </div>
        <div className={styles.loading}>Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Featured Products</h2>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Featured Products</h2>
      </div>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => navigate(`/product/${product.id}`, {
              state: product
            })}
          />
        ))}
      </div>
    </div>
  )
}
