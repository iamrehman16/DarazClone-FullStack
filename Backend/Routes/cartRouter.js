import express from "express"
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  syncCart
} from '../Controllers/cartController.js';
import authenticateJWT from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT)
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/items/:itemId', updateCartItem);
router.delete('/items/:itemId', removeCartItem);
router.delete('/clear', clearCart);
router.post('/sync', syncCart);

export default router
