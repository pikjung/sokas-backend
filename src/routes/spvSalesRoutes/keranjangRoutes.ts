import express, { Router } from 'express';
import keranjangController from '../../controllers/salesControllers/keranjangController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSales } from '../../middleware/salesMiddleware';
import { keranjangValidator } from '../../validators/salesValidator/keranjangValidator';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkSales], keranjangController.getKeranjang);
router.put('/', [authenticateToken, checkSales], keranjangController.updateKeranjang);
router.put('/discount', [authenticateToken, checkSales], keranjangController.updateDiscount);
router.delete('/:id', [authenticateToken, checkSales], keranjangController.deleteKeranjang);
router.post('/', [authenticateToken, checkSales], keranjangValidator, keranjangController.addTransactions)

export default router