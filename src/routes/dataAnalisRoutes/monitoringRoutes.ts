import express, { Router } from 'express';
import monitoringController from '../../controllers/dataAnalisControllers/monitoringControllers';

import { authenticateToken } from '../../middleware/authMiddleware';
import { checkDataAnalis } from '../../middleware/dataAnalisMiddleware'
import uploadMonitoring from "../../middleware/uploadMonitoringMiddleware";

const router: Router = express.Router();

router.get('/', [authenticateToken, checkDataAnalis], monitoringController.getMonitoring);
router.get('/reporting/:id', [authenticateToken, checkDataAnalis], monitoringController.reporting);
router.get('/address', [authenticateToken, checkDataAnalis], monitoringController.getAddress);
router.post('/upload', [authenticateToken, checkDataAnalis], uploadMonitoring.single('file'), monitoringController.uploadMonitoring);
router.delete('/:id', [authenticateToken, checkDataAnalis], monitoringController.deleteMonitoring);
router.get('/calculate/:id', [authenticateToken, checkDataAnalis], monitoringController.calculateMonitoring);
router.post('/inputAllBp', [authenticateToken, checkDataAnalis], monitoringController.inputAllBp);
router.get('/save/:id', [authenticateToken, checkDataAnalis], monitoringController.saveMonitoring);

export default router;