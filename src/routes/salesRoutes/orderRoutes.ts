import express, { Router } from 'express';
import orderController from '../../controllers/salesControllers/orderContoller';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSales } from '../../middleware/salesMiddleware';

import { orderValidator } from '../../validators/salesValidator/orderValidator';

const router: Router = express.Router();

// router.get('/brand', orderController.getBrand)
// router.get('/product/:id', orderController.getProduct)
// router.post('/cart', orderController.addCart)
router.get('/brand', [authenticateToken, checkSales], orderController.getBrand)
router.get('/product/:id', [authenticateToken, checkSales], orderController.getProduct)
router.post('/cart', [authenticateToken, checkSales], orderValidator, orderController.addCart)
router.get('/toko', [authenticateToken, checkSales], orderController.getToko)

export default router