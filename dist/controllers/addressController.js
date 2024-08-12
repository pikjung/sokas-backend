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
const addressServices_1 = __importDefault(require("../services/addressServices"));
const express_validator_1 = require("express-validator");
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const addressController = {
    getAllAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield addressServices_1.default.getAllAddress();
                return res.status(200).json((0, responseJson_1.default)("success", address, "get all address successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get all address failed"));
            }
        });
    },
    createAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const id = (0, generateId_1.default)();
                const { name, tr_id, multi_id } = req.body;
                const address = yield addressServices_1.default.createAddress({ id: id, name, tr_id, multi_id });
                return res.status(200).json((0, responseJson_1.default)("success", address, "create address successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "create address failed"));
            }
        });
    },
    updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { name, tr_id, multi_id } = req.body;
                const address = yield addressServices_1.default.updateAddress(req.params.id, { name, tr_id, multi_id });
                return res.status(200).json((0, responseJson_1.default)("success", address, "update address successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "update address failed"));
            }
        });
    },
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield addressServices_1.default.deleteAddress(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", address, "delete address successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "delete address failed"));
            }
        });
    }
};
exports.default = addressController;
