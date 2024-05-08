import express, { Router } from 'express';
import { storeValidator } from '../validators/storeValidator';
import storeController from '../controllers/storeController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], storeController.getAllStore)
router.post('/', [authenticateToken, checkRole], storeValidator, storeController.createStore)
router.put('/:id', [authenticateToken, checkRole], storeValidator, storeController.updateStore)
router.delete('/:id', [authenticateToken, checkRole], storeController.deleteStore)

export default router
