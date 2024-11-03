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
const monitoringServices_1 = __importDefault(require("../../services/dataAnalisServices/monitoringServices"));
const responseJson_1 = __importDefault(require("../../utils/responseJson"));
const monitoringController = {
    getMonitoring(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileData = yield monitoringServices_1.default.getMonitoring();
                return res.status(200).json((0, responseJson_1.default)("success", fileData, "get file data successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get file data failed"));
            }
        });
    },
    uploadMonitoring(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).json({ message: 'No file uploaded' });
                }
                const { name } = req.body;
                const file = yield monitoringServices_1.default.uploadMonitoring(name, req.file.filename, req.file.path);
                return res.status(200).json((0, responseJson_1.default)("success", file, "monitoring upload successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "monitoring upload failed"));
            }
        });
    },
    deleteMonitoring(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileData = yield monitoringServices_1.default.deleteMonitoringFile(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", fileData, "monitoring deleted"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "monitoring deleted"));
            }
        });
    },
    calculateMonitoring(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const calculateMonitoring = yield monitoringServices_1.default.calculateMonitoring(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", calculateMonitoring, "monitoring calculated successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "monitoring calculation failed"));
            }
        });
    },
    getAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield monitoringServices_1.default.getAddress();
                return res.status(200).json((0, responseJson_1.default)("success", address, "get address successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get address failed"));
            }
        });
    },
    inputAllBp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Request Body:', req.body);
                const { formData } = req.body;
                if (!formData || !Array.isArray(formData)) {
                    return res.status(400).json((0, responseJson_1.default)("error", null, "Invalid input: formData must be an array"));
                }
                const bp = yield monitoringServices_1.default.inputAllBp(formData);
                return res.status(200).json((0, responseJson_1.default)("success", bp, "input all bp successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "input all bp failed"));
            }
        });
    },
    saveMonitoring(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const monitoringJson = yield monitoringServices_1.default.saveMonitoring(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", monitoringJson, "monitoring saved successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "monitoring saved failed"));
            }
        });
    },
    reporting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reporting = yield monitoringServices_1.default.reportMonitoring(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", reporting, "monitoring reported successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "monitoring reported failed"));
            }
        });
    }
};
exports.default = monitoringController;
