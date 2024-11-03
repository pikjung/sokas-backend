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
const kulesServices_1 = __importDefault(require("../../services/salesServices/kulesServices"));
const responseJson_1 = __importDefault(require("../../utils/responseJson"));
const getUserId_1 = require("../../utils/getUserId");
const kulesContoller = {
    addKules(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const sales = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const { latitude, longitude, storeId, note, isnoo } = req.body;
                let store;
                if (isnoo) {
                    store = null;
                }
                else {
                    store = storeId;
                }
                const kules = yield kulesServices_1.default.addKules(sales === null || sales === void 0 ? void 0 : sales.user_id, { storeId: store, latitude: latitude, longitude: longitude, note: note, isnoo: isnoo });
                return res.status(200).json((0, responseJson_1.default)("success", kules, "add kules successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "add kules failed"));
            }
        });
    },
    historyKules(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const sales = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const kules = yield kulesServices_1.default.historyKules(sales === null || sales === void 0 ? void 0 : sales.user_id);
                return res.status(200).json((0, responseJson_1.default)("success", kules, "get history kules successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get history kules failed"));
            }
        });
    }
};
exports.default = kulesContoller;
