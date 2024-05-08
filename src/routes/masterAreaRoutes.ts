import express, { Router } from 'express';
import { masterAreaValidator } from '../validators/masterAreaValidator';
import masterAreaController from '../controllers/masterAreaController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], masterAreaController.getAllMasterArea)
router.post('/', [authenticateToken, checkRole], masterAreaValidator, masterAreaController.createMasterArea)
router.put('/:id', [authenticateToken, checkRole], masterAreaValidator, masterAreaController.updateMasterArea)
router.delete('/:id', [authenticateToken, checkRole], masterAreaController.deleteMasterArea)

export default router

