import express, { Router } from 'express';
import kulesContoller from '../../controllers/salesControllers/kulesController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSales } from '../../middleware/salesMiddleware';
import { kulesValidator } from '../../validators/salesValidator/kulesValidator';

const router: Router = express.Router();

router.post('/', [authenticateToken, checkSales], kulesValidator, kulesContoller.addKules);
router.get('/history', [authenticateToken, checkSales], kulesContoller.historyKules);

export default router;