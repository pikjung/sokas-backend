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
const brandServices_1 = __importDefault(require("../services/brandServices"));
const express_validator_1 = require("express-validator");
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const brandController = {
    getAllBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield brandServices_1.default.getAllbrand();
                return res.status(200).json((0, responseJson_1.default)("success", brand, "get all brand successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get all brand failed"));
            }
        });
    },
    createBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(500).json({ errors: errors.array() });
                }
                const id = (0, generateId_1.default)();
                const { name, color, value, trx_organization } = req.body;
                const brand = yield brandServices_1.default.createBrand({ id: id, name, color, value, trx_organization });
                return res.status(200).json((0, responseJson_1.default)("success", brand, "brand created successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "error creating brand"));
            }
        });
    },
    updateBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(500).json({ errors: errors.array() });
                }
                const { name, color, value, trx_organization } = req.body;
                const brand = yield brandServices_1.default.updateBrand(req.params.id, { name, color, value, trx_organization, updated_at: new Date() });
                return res.status(200).json((0, responseJson_1.default)("success", brand, "brand updated successfully"));
            }
            catch (error) {
                console.log(error);
                return res.status(500).json((0, responseJson_1.default)("error", error, "error updating brand"));
            }
        });
    },
    deleteBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield brandServices_1.default.deleteBrand(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", brand, "brand deleted successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "error deleting brand"));
            }
        });
    }
};
exports.default = brandController;
