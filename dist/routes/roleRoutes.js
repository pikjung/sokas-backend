"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleValidator_1 = require("../validators/roleValidator");
const roleController_1 = __importDefault(require("../controllers/roleController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], roleController_1.default.getAllRole);
router.post('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], roleValidator_1.roleValidator, roleController_1.default.createRole);
router.put('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], roleValidator_1.roleValidator, roleController_1.default.updateRole);
router.delete('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], roleController_1.default.deleteRole);
exports.default = router;
