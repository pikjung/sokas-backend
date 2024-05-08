import express, { Router } from 'express';
import { brandValidator } from '../validators/brandValidator';
import brandController from '../controllers/brandController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], brandController.getAllBrand)
router.post('/', [authenticateToken, checkRole], brandValidator, brandController.createBrand)
router.put('/:id', [authenticateToken, checkRole], brandValidator, brandController.updateBrand)
router.delete('/:id', [authenticateToken, checkRole], brandController.deleteBrand)

export default router