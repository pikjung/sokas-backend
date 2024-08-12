"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadValidator = void 0;
const express_validator_1 = require("express-validator");
const path_1 = __importDefault(require("path"));
exports.fileUploadValidator = [
    (0, express_validator_1.body)('excelFile').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Silakan pilih file Excel');
        }
        const extname = path_1.default.extname(req.file.originalname);
        if (extname !== '.xlsx') {
            throw new Error('Hanya file XLSX yang diperbolehkan');
        }
        return true;
    })
];
