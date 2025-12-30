import apiClient, { API_ENDPOINTS } from '../../config/api'
import mockData from '../../data/mockData.json'

// Category service with API integration
export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.CATEGORIES.LIST)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error.message)
      // Fallback to mock data
      return mockData.categories
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    try {
      // Try API first
      const response = await apiClient.get(API_ENDPOINTS.CATEGORIES.DETAIL(id))
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error.message)
      // Fallback to mock data
      return mockData.categories.find(category => category.id === parseInt(id))
    }
  }
}