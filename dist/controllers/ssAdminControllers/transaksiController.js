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
const transaksiServices_1 = __importDefault(require("../../services/ssAdminServices/transaksiServices"));
const responseJson_1 = __importDefault(require("../../utils/responseJson"));
const getUserId_1 = require("../../utils/getUserId");
const transaksiController = {
    getTransaksiBySS(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
                const user = token ? (0, getUserId_1.getUserIdFromToken)(token) : null;
                const transaksi = yield transaksiServices_1.default.getTransaksiBySS(user === null || user === void 0 ? void 0 : user.user_id);
                return res.status(200)
                    .json((0, responseJson_1.default)("success", transaksi, "get all transaksi by ssAdmin id"));
            }
            catch (error) {
                return res
                    .status(500)
                    .json((0, responseJson_1.default)("error", error, "get all transaksi failed"));
            }
        });
    },
    getSpesificTransaksi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaksi = yield transaksiServices_1.default.getSpesificTransaksi(req.params.id, req.params.brandId);
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", transaksi, "get spesific transaksi"));
            }
            catch (error) {
                return res.status(500)
                    .json((0, responseJson_1.default)("error", error, "get spesific transaksi failed"));
            }
        });
    },
    cancelTransaksi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const transaksi = yield transaksiServices_1.default.cancelTransaksi(id);
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", transaksi, "cancel transaksi successfully"));
            }
            catch (error) {
                return res.status(500)
                    .json((0, responseJson_1.default)("error", error, "cancel transaksi failed"));
            }
        });
    },
    confirmTransaksi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, data, noted } = req.body;
                const transaksi = yield transaksiServices_1.default.confirmTransaksi(id, data, noted);
                return res
                    .status(200)
                    .json((0, responseJson_1.default)("success", transaksi, "confirm transaksi successfully"));
            }
            catch (error) {
                return res
                    .status(500)
                    .json((0, responseJson_1.default)("error", error, "confirm transaksi failed"));
            }
        });
    }
    // async addTransaksiBySS(req: Request, res: Response) {
    //   try {
    //     const 
    //   } catch (error: any) {
    //   }
    // }
};
exports.default = transaksiController;
