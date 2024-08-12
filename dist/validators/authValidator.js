"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const express_validator_1 = require("express-validator");
exports.authValidator = [
    (0, express_validator_1.body)('username').notEmpty().isLength({ min: 3 }).withMessage('username harus di isi'),
    (0, express_validator_1.body)('password').notEmpty().isLength({ min: 6 }).withMessage('password harus di isi')
];
