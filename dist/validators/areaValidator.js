"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areaValidator = void 0;
const express_validator_1 = require("express-validator");
exports.areaValidator = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Nama Area harus di isi'),
    (0, express_validator_1.body)('masterAreaId').notEmpty().withMessage('Master Area harus di isi'),
    (0, express_validator_1.body)('sales_id').notEmpty().withMessage('Nama sales harus di pilih'),
    (0, express_validator_1.body)('sales_support_id').notEmpty().withMessage('Nama sales support harus di pilih'),
];
