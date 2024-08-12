"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeValidator = void 0;
const express_validator_1 = require("express-validator");
exports.storeValidator = [
    (0, express_validator_1.body)('name').notEmpty().withMessage("Nama store harus di isi"),
    (0, express_validator_1.body)('kode').notEmpty().withMessage("Kode harus di isi"),
    (0, express_validator_1.body)('password').notEmpty().withMessage("Password harus di isi"),
    (0, express_validator_1.body)('full_address').notEmpty().withMessage("Alamat lengkap harus di isi")
];
