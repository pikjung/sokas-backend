import express, { Router } from 'express';
import historyController from "../../controllers/ssAdminControllers/historyController";

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkSS } from '../../middleware/ssAdminMiddleware'

const router: Router = express.Router();

router.get('/', [authenticateToken, checkSS], historyController.getHistory)
router.get('/:id', [authenticateToken, checkSS], historyController.getSpesificHistory)

export default router