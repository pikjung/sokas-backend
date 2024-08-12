"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const masterAreaValidator_1 = require("../validators/masterAreaValidator");
const masterAreaController_1 = __importDefault(require("../controllers/masterAreaController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], masterAreaController_1.default.getAllMasterArea);
router.post('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], masterAreaValidator_1.masterAreaValidator, masterAreaController_1.default.createMasterArea);
router.put('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], masterAreaValidator_1.masterAreaValidator, masterAreaController_1.default.updateMasterArea);
router.delete('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], masterAreaController_1.default.deleteMasterArea);
exports.default = router;
