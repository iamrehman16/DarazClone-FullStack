
const express=require('express')
const  authenticateJWT  = require('../Middlewares/authMiddleware')
const {validateLogin,validateSignup}=require('../Middlewares/validationMiddleware')
const { register, login, refresh, getProfile, updateProfile } = require('../Controllers/authController')
const router=express.Router()


router.post('/login',validateLogin,login)
router.post('/register',validateSignup,register)
router.post('/refresh',refresh)

router.get('/profile',authenticateJWT,getProfile)
router.put('/profile',authenticateJWT,updateProfile)



module.exports=router