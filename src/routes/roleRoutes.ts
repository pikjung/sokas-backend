import express, { Router } from 'express';
import { roleValidator } from '../validators/roleValidator';
import roleController from '../controllers/roleController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], roleController.getAllRole)
router.post('/', [authenticateToken, checkRole], roleValidator, roleController.createRole)
router.put('/:id', [authenticateToken, checkRole], roleValidator, roleController.updateRole)
router.delete('/:id', [authenticateToken, checkRole], roleController.deleteRole)

export default router

