const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  syncCart
} = require('../Controllers/cartController');
const authenticateJWT = require('../Middlewares/authMiddleware');



router.use(authenticateJWT)
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/items/:itemId', updateCartItem);
router.delete('/items/:itemId', removeCartItem);
router.delete('/clear', clearCart);
router.post('/sync', syncCart);

module.exports = router;
