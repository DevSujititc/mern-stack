import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import {addToCart, removeFromCart, getFromCart} from '../controllers/CartController.js';

const cartRouter = express.Router();

// Apply the authMiddleware to all routes in this router
cartRouter.use(authMiddleware)

cartRouter.post('/add',addToCart)
cartRouter.delete('/remove/:itemId',removeFromCart)
cartRouter.get('/get',getFromCart)

export default cartRouter;


