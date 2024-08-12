"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidator = void 0;
const express_validator_1 = require("express-validator");
exports.orderValidator = [
    // Memastikan bahwa cartData adalah array dan memvalidasi isinya
    (0, express_validator_1.body)().isArray().withMessage("cartData harus berupa array")
        .notEmpty().withMessage("cartData tidak boleh kosong")
        .bail()
        .custom((cartData) => {
        cartData.forEach((item) => {
            if (typeof item.id !== 'string' || !item.id.trim()) {
                throw new Error("ID item harus berupa string dan tidak boleh kosong");
            }
            if (typeof item.name !== 'string' || !item.name.trim()) {
                throw new Error("Nama item harus berupa string dan tidak boleh kosong");
            }
            if (typeof item.value !== 'string' || !item.value.trim()) {
                throw new Error("Value item harus berupa string dan tidak boleh kosong");
            }
            if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
                throw new Error("Quantity item harus berupa angka positif");
            }
        });
        return true;
    }),
];
