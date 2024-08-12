"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandValidator_1 = require("../validators/brandValidator");
const brandController_1 = __importDefault(require("../controllers/brandController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], brandController_1.default.getAllBrand);
router.post('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], brandValidator_1.brandValidator, brandController_1.default.createBrand);
router.put('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], brandValidator_1.brandValidator, brandController_1.default.updateBrand);
router.delete('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], brandController_1.default.deleteBrand);
exports.default = router;
