import express, { Router } from 'express';
import orderController from '../../controllers/customerControllers/orderContoller';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkCustomer } from '../../middleware/customerMiddleware';

const router: Router = express.Router();

// router.get('/brand', orderController.getBrand)
// router.get('/product/:id', orderController.getProduct)
// router.post('/cart', orderController.addCart)
router.get('/brand', [authenticateToken, checkCustomer], orderController.getBrand)
router.get('/product/:id', [authenticateToken, checkCustomer], orderController.getProduct)
router.post('/cart', [authenticateToken, checkCustomer], orderController.addCart)

export default router