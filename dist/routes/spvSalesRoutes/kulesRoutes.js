"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kulesController_1 = __importDefault(require("../../controllers/spvSalesControllers/kulesController"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const spvSalesMiddleware_1 = require("../../middleware/spvSalesMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, spvSalesMiddleware_1.checkSpvSales], kulesController_1.default.getMapData);
exports.default = router;
