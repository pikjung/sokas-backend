"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderContoller_1 = __importDefault(require("../../controllers/customerControllers/orderContoller"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const customerMiddleware_1 = require("../../middleware/customerMiddleware");
const orderValidator_1 = require("../../validators/customerValidator/orderValidator");
const router = express_1.default.Router();
// router.get('/brand', orderController.getBrand)
// router.get('/product/:id', orderController.getProduct)
// router.post('/cart', orderController.addCart)
router.get('/brand', [authMiddleware_1.authenticateToken, customerMiddleware_1.checkCustomer], orderContoller_1.default.getBrand);
router.get('/product/:id', [authMiddleware_1.authenticateToken, customerMiddleware_1.checkCustomer], orderContoller_1.default.getProduct);
router.post('/cart', [authMiddleware_1.authenticateToken, customerMiddleware_1.checkCustomer], orderValidator_1.orderValidator, orderContoller_1.default.addCart);
exports.default = router;
