import express, { Router } from 'express';
import transaksiController from '../../controllers/customerControllers/transaksiController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkCustomer } from '../../middleware/customerMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkCustomer], transaksiController.getTransaksi)

export default router