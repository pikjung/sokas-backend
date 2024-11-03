import express, { Router } from 'express';
import keranjangController from '../../controllers/spvSalesControllers/keranjangController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSpvSales } from '../../middleware/spvSalesMiddleware';
import { keranjangValidator } from '../../validators/spvSalesValidator/keranjangValidator';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkSpvSales], keranjangController.getKeranjang);
router.put('/', [authenticateToken, checkSpvSales], keranjangController.updateKeranjang);
router.put('/discount', [authenticateToken, checkSpvSales], keranjangController.updateDiscount);
router.delete('/:id', [authenticateToken, checkSpvSales], keranjangController.deleteKeranjang);
router.post('/', [authenticateToken, checkSpvSales], keranjangValidator, keranjangController.addTransactions)

export default router