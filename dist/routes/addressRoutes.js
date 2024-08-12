"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addressValidator_1 = require("../validators/addressValidator");
const addressController_1 = __importDefault(require("../controllers/addressController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], addressController_1.default.getAllAddress);
router.post('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], addressValidator_1.addressValidator, addressController_1.default.createAddress);
router.put('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], addressValidator_1.addressValidator, addressController_1.default.updateAddress);
router.delete('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], addressController_1.default.deleteAddress);
exports.default = router;
