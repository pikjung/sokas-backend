"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderContoller_1 = __importDefault(require("../../controllers/spvSalesControllers/orderContoller"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const spvSalesMiddleware_1 = require("../../middleware/spvSalesMiddleware");
const orderValidator_1 = require("../../validators/spvSalesValidator/orderValidator");
const router = express_1.default.Router();
router.get('/brand', [authMiddleware_1.authenticateToken, spvSalesMiddleware_1.checkSpvSales], orderContoller_1.default.getBrand);
router.get('/product/:id', [authMiddleware_1.authenticateToken, spvSalesMiddleware_1.checkSpvSales], orderContoller_1.default.getProduct);
router.post('/cart', [authMiddleware_1.authenticateToken, spvSalesMiddleware_1.checkSpvSales], orderValidator_1.orderValidator, orderContoller_1.default.addCart);
router.get('/toko', [authMiddleware_1.authenticateToken, spvSalesMiddleware_1.checkSpvSales], orderContoller_1.default.getToko);
exports.default = router;
