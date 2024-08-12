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
const express_validator_1 = require("express-validator");
const roleServices_1 = __importDefault(require("../services/roleServices"));
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const generateId_1 = __importDefault(require("../utils/generateId"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const roleController = {
    getAllRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield roleServices_1.default.getAllRole();
                return res.status(200).json((0, responseJson_1.default)("success", role, "get All role successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "error get all role"));
            }
        });
    },
    createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { name } = req.body;
                const role = yield roleServices_1.default.createRole({ id: (0, generateId_1.default)(), name });
                return res.status(201).json((0, responseJson_1.default)("success", role, "role created successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "role create failed"));
            }
        });
    },
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const role = yield roleServices_1.default.updateRole(req.params.id, req.body);
                return res.status(200).json((0, responseJson_1.default)("success", role, "role updated successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "role update failed"));
            }
        });
    },
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield roleServices_1.default.deleteRole(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", role, "role deleted"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "role delete failed"));
            }
        });
    }
};
exports.default = roleController;
