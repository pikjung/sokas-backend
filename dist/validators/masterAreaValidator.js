"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterAreaValidator = void 0;
const express_validator_1 = require("express-validator");
exports.masterAreaValidator = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Nama Area harus di isi')
];
