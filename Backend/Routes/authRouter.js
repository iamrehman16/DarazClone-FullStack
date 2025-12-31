
import express from "express"
import  authenticateJWT  from '../Middlewares/authMiddleware.js'
import {validateLogin,validateSignup} from '../Middlewares/validationMiddleware.js'
import { register, login, refresh, getProfile, updateProfile } from '../Controllers/authController.js'
const router=express.Router()


router.post('/login',validateLogin,login)
router.post('/register',validateSignup,register)
router.post('/refresh',refresh)

router.get('/profile',authenticateJWT,getProfile)
router.put('/profile',authenticateJWT,updateProfile)


export default router