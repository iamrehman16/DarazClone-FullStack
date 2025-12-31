import express from 'express';
import {getAllCategories,getCategoryById} from '../Controllers/categoryController.js'
import  authenticateJWT  from '../Middlewares/authMiddleware.js'

const router=express.Router();

router.use(authenticateJWT)
router.get('/',getAllCategories)
router.get('/:id',getCategoryById)

export default router
