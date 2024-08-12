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
const generateId_1 = __importDefault(require("../utils/generateId"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userServices_1 = __importDefault(require("../services/userServices"));
const express_validator_1 = require("express-validator");
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const userController = {
    getAllusers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userServices_1.default.getAllusers();
                return res.status(200).json((0, responseJson_1.default)("success", user, "get all User successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get all User failed"));
            }
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { name, username, email, password, roleId } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const id = (0, generateId_1.default)();
                const user = yield userServices_1.default.createUser({ id: id, username, name, email, password: hashedPassword, roleId });
                return res.status(200).json((0, responseJson_1.default)("success", user, "User created successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "User created failed"));
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const specificUser = yield userServices_1.default.getSpecificUser(req.params.id);
                const { name, username, email, password, roleId } = req.body;
                let hashedPassword;
                if (password === null) {
                    hashedPassword = specificUser === null || specificUser === void 0 ? void 0 : specificUser.password;
                }
                else {
                    hashedPassword = yield bcrypt_1.default.hash(password, 10);
                }
                const user = yield userServices_1.default.updateUser(req.params.id, { username, name, email, password: hashedPassword, roleId, updated_at: new Date() });
                return res.status(200).json((0, responseJson_1.default)("success", user, "User updated successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "User updated failed"));
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userServices_1.default.deleteUser(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", user, "User deleted successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "User deleted failed"));
            }
        });
    }
};
exports.default = userController;
