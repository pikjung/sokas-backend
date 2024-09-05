import express, { Router } from 'express'
import transaksiController from '../../controllers/ssAdminControllers/transaksiController'

import { authenticateToken } from '../../middleware/authMiddleware'
import { checkSS } from '../../middleware/ssAdminMiddleware'

const router: Router = express.Router();

router.get('/', [authenticateToken, checkSS], transaksiController.getTransaksiBySS)
router.get('/:id/:brandId', [authenticateToken, checkSS], transaksiController.getSpesificTransaksi)
router.post('/cancel', [authenticateToken, checkSS], transaksiController.cancelTransaksi)
router.post('/confirm', [authenticateToken, checkSS], transaksiController.confirmTransaksi)
router.post('/pending', [authenticateToken, checkSS], transaksiController.pendingTransaksi)
router.get('/pending', [authenticateToken, checkSS], transaksiController.getTransaksiPending)
// router.post('/', [authenticateToken, checkSS], transaksiController.addTransaksiBySS)

export default router