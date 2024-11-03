import express, { Router } from 'express';
import transaksiController from '../../controllers/spvSalesControllers/transaksiController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSpvSales } from '../../middleware/spvSalesMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkSpvSales], transaksiController.getTransaksi)

export default router