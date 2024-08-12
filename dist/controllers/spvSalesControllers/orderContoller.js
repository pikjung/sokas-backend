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
const orderServices_1 = __importDefault(require("../../services/salesServices/orderServices"));
const responseJson_1 = __importDefault(require("../../utils/responseJson"));
const getUserId_1 = require("../../utils/getUserId");
const orderController = {
    getBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield orderServices_1.default.getBrand();
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", brand, "get all brand successfully"));
            }
            catch (error) {
                return res
                    .status(500)
                    .json((0, responseJson_1.default)("error", error, "get brand failed"));
            }
        });
    },
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield orderServices_1.default.getProduct(req.params.id);
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", product, "get all products successfully"));
            }
            catch (error) {
                return res
                    .status(500)
                    .json((0, responseJson_1.default)("error", error, "get all products failed"));
            }
        });
    },
    addCart(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Array.isArray(req.body.cartData)) {
                    return res
                        .status(400)
                        .json((0, responseJson_1.default)("error", null, "Invalid request body, expected an array of cart items"));
                }
                if (req.body.cartData === undefined || req.body.cartData.length == 0) {
                    return res
                        .status(400)
                        .json((0, responseJson_1.default)("error", null, "Array tidak boleh kosong"));
                }
                const { cartData, storeId } = req.body;
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const dataToko = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const cart = yield orderServices_1.default.addCart(cartData, storeId, dataToko === null || dataToko === void 0 ? void 0 : dataToko.user_id);
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", cart, "add cart successfully"));
            }
            catch (error) {
                console.error("Error adding cart:", error);
                return res
                    .status(500)
                    .json((0, responseJson_1.default)("error", error, "add cart failed"));
            }
        });
    },
    getToko(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const dataSales = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const toko = yield orderServices_1.default.getToko(dataSales === null || dataSales === void 0 ? void 0 : dataSales.user_id);
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", toko, "get all toko successfully"));
            }
            catch (error) {
                return res
                    .status(500)
                    .json((0, responseJson_1.default)("error", error, "get brand failed"));
            }
        });
    }
};
exports.default = orderController;
