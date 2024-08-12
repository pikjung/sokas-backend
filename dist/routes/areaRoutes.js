"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const areaValidator_1 = require("../validators/areaValidator");
const areaController_1 = __importDefault(require("../controllers/areaController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], areaController_1.default.getAllArea);
router.post('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], areaValidator_1.areaValidator, areaController_1.default.createArea);
router.put('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], areaValidator_1.areaValidator, areaController_1.default.updateArea);
router.delete('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], areaController_1.default.deleteArea);
exports.default = router;
