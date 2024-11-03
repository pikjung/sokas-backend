"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaksiController_1 = __importDefault(require("../../controllers/ssAdminControllers/transaksiController"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ssAdminMiddleware_1 = require("../../middleware/ssAdminMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], transaksiController_1.default.getTransaksiBySS);
router.get('/:id/:brandId', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], transaksiController_1.default.getSpesificTransaksi);
router.post('/cancel', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], transaksiController_1.default.cancelTransaksi);
router.post('/confirm', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], transaksiController_1.default.confirmTransaksi);
router.post('/pending', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], transaksiController_1.default.pendingTransaksi);
router.get('/pending', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], transaksiController_1.default.getTransaksiPending);
router.get('/ssusers', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], transaksiController_1.default.getAllSSUsers);
// router.post('/', [authenticateToken, checkSS], transaksiController.addTransaksiBySS)
exports.default = router;
