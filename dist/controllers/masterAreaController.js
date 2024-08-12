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
const masterAreaServices_1 = __importDefault(require("../services/masterAreaServices"));
const express_validator_1 = require("express-validator");
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const masterAreaController = {
    getAllMasterArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const masterArea = yield masterAreaServices_1.default.getAllMasterArea();
                return res.status(200).json((0, responseJson_1.default)("success", masterArea, "get all master area successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get all master area failed"));
            }
        });
    },
    createMasterArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const id = (0, generateId_1.default)();
                const { name, spvId } = req.body;
                const masterArea = yield masterAreaServices_1.default.createMasterArea({ id: id, name, spv_id: spvId });
                return res.status(200).json((0, responseJson_1.default)("success", masterArea, "create Master Area successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "create Master Area failed"));
            }
        });
    },
    updateMasterArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { name, spvId } = req.body;
                const masterArea = yield masterAreaServices_1.default.updateMasterArea(req.params.id, { name, spv_id: spvId, updated_at: new Date() });
                return res.status(200).json((0, responseJson_1.default)("success", masterArea, "update Master Area successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "Update master area failed"));
            }
        });
    },
    deleteMasterArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const masterArea = yield masterAreaServices_1.default.deleteMasterArea(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", masterArea, "Master Area deleted successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "Master Area Delete Failed"));
            }
        });
    }
};
exports.default = masterAreaController;
