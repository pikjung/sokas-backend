"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userValidator_1 = require("../validators/userValidator");
const userEditValidator_1 = require("../validators/userEditValidator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.get("/", [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], userController_1.default.getAllusers);
router.post("/", [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], userValidator_1.userValidator, userController_1.default.createUser);
router.put("/:id", [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], userEditValidator_1.userEditValidator, userController_1.default.updateUser);
router.delete("/:id", [authMiddleware_1.authenticateToken, roleMiddleware_1.checkRole], userController_1.default.deleteUser);
exports.default = router;
