"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kulesValidator = void 0;
const express_validator_1 = require("express-validator");
exports.kulesValidator = [
    (0, express_validator_1.body)('isnoo')
        .isBoolean()
        .withMessage('isnoo harus berupa nilai boolean (true/false)'),
    // Validasi untuk storeId yang hanya diterapkan jika isnoo bernilai false
    (0, express_validator_1.body)('storeId')
        .if((value, { req }) => req.body.isnoo === false)
        .notEmpty()
        .withMessage('Toko harus di isi'),
    // Validasi untuk latitude
    (0, express_validator_1.body)('latitude')
        .notEmpty()
        .withMessage('Latitude harus di isi'),
    // Validasi untuk longitude
    (0, express_validator_1.body)('longitude')
        .notEmpty()
        .withMessage('Longitude harus di pilih')
];
