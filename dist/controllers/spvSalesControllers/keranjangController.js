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
const keranjangServices_1 = __importDefault(require("../../services/spvSalesServices/keranjangServices"));
const responseJson_1 = __importDefault(require("../../utils/responseJson"));
const getUserId_1 = require("../../utils/getUserId");
const express_validator_1 = require("express-validator");
const keranjangController = {
    getKeranjang(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const dataToko = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const keranjang = yield keranjangServices_1.default.getKeranjang(dataToko === null || dataToko === void 0 ? void 0 : dataToko.user_id);
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", keranjang, "get all cart successfully"));
            }
            catch (error) {
                return res.status(500)
                    .json((0, responseJson_1.default)("error", error, "get all cart failed"));
            }
        });
    },
    deleteKeranjang(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const dataToko = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const id = req.params.id;
                const keranjang = yield keranjangServices_1.default.deleteKeranjang(dataToko === null || dataToko === void 0 ? void 0 : dataToko.user_id, id);
                return res.status(200).json((0, responseJson_1.default)("success", keranjang, "delete keranjang successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "delete keranjang failed"));
            }
        });
    },
    updateKeranjang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartId, qty } = req.body;
                const keranjang = yield keranjangServices_1.default.updateKeranjang(cartId, qty);
                return res.status(200).json((0, responseJson_1.default)("success", keranjang, "update keranjang successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "update keranjang failed"));
            }
        });
    },
    updateDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartId, discount } = req.body;
                const keranjang = yield keranjangServices_1.default.updateDiscount(cartId, discount);
                return res.status(200).json((0, responseJson_1.default)("success", keranjang, "update keranjang successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "update keranjang failed"));
            }
        });
    },
    addTransactions(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const dataToko = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const keranjang = yield keranjangServices_1.default.addTransactions(dataToko === null || dataToko === void 0 ? void 0 : dataToko.user_id, req.body);
                return res.status(200).json((0, responseJson_1.default)("success", keranjang, "add Transaction successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "add Transaction failed"));
            }
        });
    }
};
exports.default = keranjangController;
