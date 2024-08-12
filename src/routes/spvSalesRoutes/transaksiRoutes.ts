import express, { Router } from 'express';
import transaksiController from '../../controllers/salesControllers/transaksiController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSales } from '../../middleware/salesMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkSales], transaksiController.getTransaksi)

export default router