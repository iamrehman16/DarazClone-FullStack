import apiClient, { API_ENDPOINTS } from '../../config/api'
import mockData from '../../data/mockData.json'

// Product service with API integration
export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error.message)
      // Fallback to mock data
      return mockData.products
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAIL(id))
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error.message)
      // Fallback to mock data
      return mockData.products.find(product => product.id === parseInt(id))
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.BY_CATEGORY(encodeURIComponent(category)))
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error.message)
      // Fallback to mock data
      return mockData.products.filter(product => product.category === category)
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.FEATURED)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error.message)
      // Fallback to mock data
      return mockData.products.slice(0, 2)
    }
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.SEARCH, {
        params: { q: query, ...filters }
      })
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error.message)
      // Fallback to mock data search
      const searchTerm = query.toLowerCase()
      return mockData.products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
    }
  }
}