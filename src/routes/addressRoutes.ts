import express, { Router } from 'express';
import { addressValidator } from '../validators/addressValidator';
import addressController from '../controllers/addressController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], addressController.getAllAddress)
router.post('/', [authenticateToken, checkRole], addressValidator, addressController.createAddress)
router.put('/:id', [authenticateToken, checkRole], addressValidator, addressController.updateAddress)
router.delete('/:id', [authenticateToken, checkRole], addressController.deleteAddress)

export default router
