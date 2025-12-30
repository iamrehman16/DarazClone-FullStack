const express=require('express');
const router=express.Router();
const {getAllCategories,getCategoryById}=require('../Controllers/categoryController')
const  authenticateJWT  = require('../Middlewares/authMiddleware')

router.use(authenticateJWT)
router.get('/',getAllCategories)
router.get('/:id',getCategoryById)

module.exports=router