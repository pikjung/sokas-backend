"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../config"));
const prisma = new client_1.PrismaClient();
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json((0, responseJson_1.default)("error", {}, "Access Denied. Token is missing"));
    jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(401).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
