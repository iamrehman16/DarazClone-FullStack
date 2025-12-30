import { productService } from './api/productService'
import { categoryService } from './api/categoryService'

// Legacy dataService - now uses API services
export const dataService = {
  // Get all products
  getAllProducts: () => productService.getAllProducts(),

  // Get product by ID
  getProductById: (id) => productService.getProductById(id),

  // Get products by category
  getProductsByCategory: (category) => productService.getProductsByCategory(category),

  // Get all categories
  getAllCategories: () => categoryService.getAllCategories(),

  // Get featured products
  getFeaturedProducts: () => productService.getFeaturedProducts(),

  // Search products
  searchProducts: (query, filters) => productService.searchProducts(query, filters)
}