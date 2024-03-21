import express, { Router } from 'express';
import { roleValidator } from '../validators/roleValidator';
import roleController from '../controllers/roleController';

import { authenticateToken } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.get('/', authenticateToken, roleController.getAllRole)
router.post('/', roleValidator, roleController.createRole)
router.put('/:id', roleValidator, roleController.updateRole)
router.delete('/:id', roleController.deleteRole)

export default router
