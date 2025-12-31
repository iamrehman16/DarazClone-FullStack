import express from "express"

import  authenticateJWT from '../Middlewares/authMiddleware.js'
import { 
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getFeaturedProducts
} from '../Controllers/productController.js'

const router=express.Router()

router.use(authenticateJWT)
router.get('/',getAllProducts)
router.get('/featured', getFeaturedProducts);
router.get('/:id',getProductById)
router.get('/category/:category',getProductsByCategory)
router.get('/search', searchProducts);



export default router