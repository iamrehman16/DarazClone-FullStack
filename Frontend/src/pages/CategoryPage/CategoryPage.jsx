import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from "./CategoryPage.module.css"
import ProductCard from "../../components/Products/ProdutCard/ProductCard"
import { dataService } from "../../services/dataService"

export default function CategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const decodedCategory = decodeURIComponent(category)
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        // Use the search endpoint to get products matching the term, then filter by category match
        const results = await dataService.searchProducts(decodedCategory)
        const filtered = results.filter(p => p.category && p.category.toLowerCase().includes(decodedCategory.toLowerCase()))
        setProducts(filtered)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error loading category products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [decodedCategory])

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{decodedCategory}</h1>
        <div className={styles.loading}>Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{decodedCategory}</h1>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{decodedCategory}</h1>
      <div className={styles.productsGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              onClick={() => navigate(`/product/${product.id}`, {
                state: product
              })}
            />
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  )
}
