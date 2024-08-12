"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = void 0;
const express_validator_1 = require("express-validator");
exports.productValidator = [
    (0, express_validator_1.body)('name').notEmpty().isLength({ min: 3 }).withMessage("Nama Product harus di isi"),
    (0, express_validator_1.body)('value').notEmpty().isLength({ min: 3 }).withMessage("Value harus di isi"),
    (0, express_validator_1.body)('brandId').notEmpty().withMessage("Brand harus di pilih"),
];
