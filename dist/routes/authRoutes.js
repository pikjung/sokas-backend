"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const authValidator_1 = require("../validators/authValidator");
const router = express_1.default.Router();
router.post("/login", authValidator_1.authValidator, authController_1.default.login);
// router.post("/logout", authValidator, authController.logout);
router.get("/verify-token", authController_1.default.verifyToken);
exports.default = router;
