"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleValidator = void 0;
const express_validator_1 = require("express-validator");
exports.roleValidator = [
    (0, express_validator_1.body)('name').notEmpty().isLength({ min: 2 }).withMessage('Nama harus di isi')
];
