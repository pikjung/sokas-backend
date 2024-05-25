import express, { Router } from 'express';
import { storeValidator } from '../validators/storeValidator';
import storeController from '../controllers/storeController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';
import { storeEditValidator } from '../validators/storeEditValidator';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], storeController.getAllStore)
router.post('/', [authenticateToken, checkRole], storeValidator, storeController.createStore)
router.put('/:id', [authenticateToken, checkRole], storeEditValidator, storeController.updateStore)
router.delete('/:id', [authenticateToken, checkRole], storeController.deleteStore)
router.post('/upload', [authenticateToken, checkRole], storeController.fileUpload)

export default router
