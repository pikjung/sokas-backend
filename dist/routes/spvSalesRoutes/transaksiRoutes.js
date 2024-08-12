"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaksiController_1 = __importDefault(require("../../controllers/salesControllers/transaksiController"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const salesMiddleware_1 = require("../../middleware/salesMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], transaksiController_1.default.getTransaksi);
exports.default = router;
