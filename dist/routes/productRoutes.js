"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productValidator_1 = require("../validators/productValidator");
const productController_1 = __importDefault(require("../controllers/productController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const fileUploadValidator_1 = require("../validators/fileUploadValidator");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], productController_1.default.getAllProduct);
router.post('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], productValidator_1.productValidator, productController_1.default.createProduct);
router.put('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], productValidator_1.productValidator, productController_1.default.updateProduct);
router.delete('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], productController_1.default.deleteProduct);
router.post('/upload', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], fileUploadValidator_1.fileUploadValidator, productController_1.default.fileUpload);
exports.default = router;
