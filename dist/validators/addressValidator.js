"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressValidator = void 0;
const express_validator_1 = require("express-validator");
exports.addressValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage('Nama harus di isi'),
];
