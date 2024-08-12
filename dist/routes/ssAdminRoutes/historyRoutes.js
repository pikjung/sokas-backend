"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyController_1 = __importDefault(require("../../controllers/ssAdminControllers/historyController"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ssAdminMiddleware_1 = require("../../middleware/ssAdminMiddleware");
const router = express_1.default.Router();
router.get('/', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], historyController_1.default.getHistory);
router.get('/:id', [authMiddleware_1.authenticateToken, ssAdminMiddleware_1.checkSS], historyController_1.default.getSpesificHistory);
exports.default = router;
