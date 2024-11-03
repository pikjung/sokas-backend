import express, { Router } from 'express';
import kulesController from '../../controllers/spvSalesControllers/kulesController';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSpvSales } from '../../middleware/spvSalesMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkSpvSales], kulesController.getMapData);

export default router;