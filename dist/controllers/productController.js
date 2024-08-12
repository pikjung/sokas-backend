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
const productServices_1 = __importDefault(require("../services/productServices"));
const express_validator_1 = require("express-validator");
const responseJson_1 = __importDefault(require("../utils/responseJson"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const extname = path_1.default.extname(file.originalname);
        if (extname === '.xls' || extname === '.xlsx') {
            return cb(null, true);
        }
        cb(new Error('Hanya file Excel yang diperbolehkan'));
    }
}).single('file');
const handleExcelUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: 'Silakan pilih file Excel' });
    }
    try {
        const data = yield productServices_1.default.upload(req.file.path);
        if (data.success) {
            // Hapus file yang di-upload setelah selesai
            fs_1.default.unlinkSync(req.file.path);
            // Kirim respons berhasil
            return res.status(200).json((0, responseJson_1.default)("success", data.data, "File uploaded successfully"));
        }
    }
    catch (error) {
        return res.status(400).json((0, responseJson_1.default)("error", error, "File upload failed"));
    }
});
const productController = {
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productServices_1.default.getAllProduct();
                return res.status(200).json((0, responseJson_1.default)("success", product, "get all product successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "get all product failed"));
            }
        });
    },
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const id = (0, generateId_1.default)();
                const { name, value, brandId } = req.body;
                const product = yield productServices_1.default.createProduct({ id: id, name, value, brandId });
                return res.status(200).json((0, responseJson_1.default)("success", product, "create product successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "error creating product"));
            }
        });
    },
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { name, value, brandId } = req.body;
                const product = yield productServices_1.default.updateProduct(req.params.id, { name, value, brandId, updated_at: new Date() });
                return res.status(200).json((0, responseJson_1.default)("success", product, "updated product successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "error updating product"));
            }
        });
    },
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productServices_1.default.deleteProduct(req.params.id);
                return res.status(200).json((0, responseJson_1.default)("success", product, "deleted product successfully"));
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "error deleting product"));
            }
        });
    },
    fileUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                upload(req, res, (err) => {
                    if (err) {
                        return res.status(400).json((0, responseJson_1.default)("error", err, "error uploading"));
                    }
                    handleExcelUpload(req, res);
                });
            }
            catch (error) {
                return res.status(500).json((0, responseJson_1.default)("error", error, "error uploading"));
            }
        });
    }
};
exports.default = productController;
