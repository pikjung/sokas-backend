"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const express_validator_1 = require("express-validator");
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const prisma = new client_1.PrismaClient();
const authController = {
    login(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { username, password } = req.body;
            const user = yield prisma.user.findUnique({
                where: { username },
                include: {
                    Role: true
                }
            });
            if (!user)
                return res
                    .status(401)
                    .json((0, responseJson_1.default)("error", {}, "Username atau password salah"));
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch)
                return res
                    .status(401)
                    .json((0, responseJson_1.default)("error", {}, "Invalid Password"));
            const token = jsonwebtoken_1.default.sign({ user_id: user.id, name: user.name, role: (_a = user.Role) === null || _a === void 0 ? void 0 : _a.name }, config_1.default.jwtSecret, {
                expiresIn: "2h",
            });
            res.status(200).json((0, responseJson_1.default)("success", { token: token, role: (_b = user.Role) === null || _b === void 0 ? void 0 : _b.name }, "berhasil login"));
        });
    },
    verifyToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token)
                return res
                    .status(401)
                    .json((0, responseJson_1.default)("error", {}, "Access Denied. Token is missing"));
            try {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
                res.status(200).json((0, responseJson_1.default)("success", decode, "Token valid"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", {}, "Invalid token"));
            }
        });
    },
};
exports.default = authController;
