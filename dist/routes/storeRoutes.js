"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeValidator_1 = require("../validators/storeValidator");
const storeController_1 = __importDefault(require("../controllers/storeController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const storeEditValidator_1 = require("../validators/storeEditValidator");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], storeController_1.default.getAllStore);
router.post('/', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], storeValidator_1.storeValidator, storeController_1.default.createStore);
router.put('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], storeEditValidator_1.storeEditValidator, storeController_1.default.updateStore);
router.delete('/:id', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], storeController_1.default.deleteStore);
router.post('/upload', [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], storeController_1.default.fileUpload);
exports.default = router;
