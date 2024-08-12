"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keranjangController_1 = __importDefault(require("../../controllers/salesControllers/keranjangController"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const salesMiddleware_1 = require("../../middleware/salesMiddleware");
const keranjangValidator_1 = require("../../validators/salesValidator/keranjangValidator");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], keranjangController_1.default.getKeranjang);
router.put('/', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], keranjangController_1.default.updateKeranjang);
router.put('/discount', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], keranjangController_1.default.updateDiscount);
router.delete('/:id', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], keranjangController_1.default.deleteKeranjang);
router.post('/', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], keranjangValidator_1.keranjangValidator, keranjangController_1.default.addTransactions);
exports.default = router;
