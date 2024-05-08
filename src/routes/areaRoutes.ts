import express, { Router } from 'express';
import { areaValidator } from '../validators/areaValidator';
import areaController from '../controllers/areaController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], areaController.getAllArea)
router.post('/', [authenticateToken, checkRole], areaValidator, areaController.createArea)
router.put('/:id', [authenticateToken, checkRole], areaValidator, areaController.updateArea)
router.delete('/:id', [authenticateToken, checkRole], areaController.deleteArea)

export default router

