import express, { Router } from 'express';
import keranjangController from '../../controllers/customerControllers/keranjangController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkCustomer } from '../../middleware/customerMiddleware';
import { keranjangValidator } from '../../validators/customerValidator/keranjangValidator';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkCustomer], keranjangController.getKeranjang);
router.put('/', [authenticateToken, checkCustomer], keranjangController.updateKeranjang);
router.delete('/:id', [authenticateToken, checkCustomer], keranjangController.deleteKeranjang);
router.post('/', [authenticateToken, checkCustomer], keranjangValidator, keranjangController.addTransactions)

export default router