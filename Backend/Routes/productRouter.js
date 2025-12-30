
const express=require('express')
const router=express.Router()
const  authenticateJWT = require('../Middlewares/authMiddleware')
const { getAllProducts,getProductById,getProductsByCategory,searchProducts,getFeaturedProducts } = require('../Controllers/productController')

router.use(authenticateJWT)
router.get('/',getAllProducts)
router.get('/featured', getFeaturedProducts);
router.get('/:id',getProductById)
router.get('/category/:category',getProductsByCategory)
router.get('/search', searchProducts);



module.exports=router