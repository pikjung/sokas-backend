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
const areaServices_1 = __importDefault(require("../services/areaServices"));
const express_validator_1 = require("express-validator");
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const areaController = {
    getAllArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const area = yield areaServices_1.default.getAllArea();
                return res.status(200).json((0, responseJson_1.default)("success", area, "get all Area successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get all Area failed"));
            }
        });
    },
    createArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const id = (0, generateId_1.default)();
                const { name, masterAreaId, sales_id, sales_support_id } = req.body;
                const area = yield areaServices_1.default.createArea({ id: id, name, masterAreaId, sales_id, sales_support_id });
                return res.status(200).json((0, responseJson_1.default)("success", area, "create Area successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "Create Area failed"));
            }
        });
    },
    updateArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { name, masterAreaId, sales_id, sales_support_id } = req.body;
                const area = yield areaServices_1.default.updateArea(req.params.id, { name, masterAreaId, sales_id, sales_support_id, updated_at: new Date() });
                return res.status(200).json((0, responseJson_1.default)("success", area, "Area updated successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "Area updated failed"));
            }
        });
    },
    deleteArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const area = yield areaServices_1.default.deleteArea(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", area, "Area deleted successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "Area deleted failed"));
            }
        });
    }
};
exports.default = areaController;
