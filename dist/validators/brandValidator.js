"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandValidator = void 0;
const express_validator_1 = require("express-validator");
exports.brandValidator = [
    (0, express_validator_1.body)('name').notEmpty().isLength({ min: 3 }).withMessage('Brand harus di isi'),
    (0, express_validator_1.body)('color').notEmpty().isLength({ min: 3 }).withMessage('Warna harus di isi'),
    (0, express_validator_1.body)('value').notEmpty().isLength({ min: 3 }).withMessage('Value harus di isi'),
    (0, express_validator_1.body)('trx_organization').notEmpty().isLength({ min: 3 }).withMessage('Value harus di isi'),
];
