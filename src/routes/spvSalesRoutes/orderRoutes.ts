import express, { Router } from 'express';
import orderController from '../../controllers/spvSalesControllers/orderContoller';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSpvSales } from '../../middleware/spvSalesMiddleware';
import { orderValidator } from '../../validators/spvSalesValidator/orderValidator';

const router: Router = express.Router();

router.get('/brand', [authenticateToken, checkSpvSales], orderController.getBrand)
router.get('/product/:id', [authenticateToken, checkSpvSales], orderController.getProduct)
router.post('/cart', [authenticateToken, checkSpvSales], orderValidator, orderController.addCart)
router.get('/toko', [authenticateToken, checkSpvSales], orderController.getToko)

export default router