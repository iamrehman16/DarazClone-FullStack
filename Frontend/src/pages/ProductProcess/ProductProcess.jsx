import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import styles from "./ProductProcess.module.css"

import ProductGallery from "../../components/product/ProductGallery"
import ProductInfo from "../../components/product/ProductInfo"
import QuantitySelector from "../../components/product/QuantitySelector"
import PriceSummary from "../../components/product/PriceSummary"
import AddToCartButton from "../../components/product/AddToCartButton"

import { useCart } from "../../Context/CartContext"
import { dataService } from "../../services/dataService"

export default function ProductProcess() {
  const { state } = useLocation()
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(state || null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(!state) // Only load if no state passed
  const [error, setError] = useState(null)

  // Fetch product if not passed via state (direct URL)
  useEffect(() => {
    if (!product && id) {
      const loadProduct = async () => {
        try {
          setLoading(true)
          const prod = await dataService.getProductById(id)
          setProduct(prod || null)
        } catch (err) {
          setError('Failed to load product')
          console.error('Error loading product:', err)
        } finally {
          setLoading(false)
        }
      }

      loadProduct()
    }
  }, [id, product])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading product...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Product not found</div>
      </div>
    )
  }

  const priceNum = Number(product.price) || 0
  const discountNum = Number(product.discount) || 0
  const discountedPrice = Math.round(priceNum - (priceNum * discountNum) / 100)

  return (
    <div className={styles.container}>
      <ProductGallery image={product.image} title={product.title} />

      <div className={styles.right}>
        <ProductInfo {...product} />

        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((q) => q + 1)}
          onDecrease={() => quantity > 1 && setQuantity((q) => q - 1)}
        />

        <PriceSummary price={discountedPrice} quantity={quantity} />

        <AddToCartButton
          productId={product.id}
          onClick={() => addToCart({ ...product, price: discountedPrice }, quantity)}
        />
      </div>
    </div>
  )
}
