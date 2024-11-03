"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kulesController_1 = __importDefault(require("../../controllers/salesControllers/kulesController"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const salesMiddleware_1 = require("../../middleware/salesMiddleware");
const kulesValidator_1 = require("../../validators/salesValidator/kulesValidator");
const router = express_1.default.Router();
router.post('/', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], kulesValidator_1.kulesValidator, kulesController_1.default.addKules);
router.get('/history', [authMiddleware_1.authenticateToken, salesMiddleware_1.checkSales], kulesController_1.default.historyKules);
exports.default = router;
