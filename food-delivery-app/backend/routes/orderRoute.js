import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus } from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify',authMiddleware, verifyOrder);
orderRouter.get('/userOrders',authMiddleware, userOrders);
orderRouter.get('/listOrders', listOrders);
orderRouter.post('/updateOrderStatus', updateOrderStatus);

export default orderRouter;
