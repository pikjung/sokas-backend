"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidator = void 0;
const express_validator_1 = require("express-validator");
exports.orderValidator = [
    // Memastikan bahwa data adalah objek
    (0, express_validator_1.body)().isObject().withMessage("Data harus berupa objek"),
    // Memastikan bahwa cartData adalah array dan memvalidasi isinya
    (0, express_validator_1.body)('cartData').isArray().withMessage("cartData harus berupa array")
        .notEmpty().withMessage("cartData tidak boleh kosong")
        .bail()
        .custom((cartData) => {
        cartData.forEach((item) => {
            if (typeof item.id !== 'string' || !item.id) {
                throw new Error("ID item harus berupa string dan tidak boleh kosong");
            }
            if (typeof item.name !== 'string' || !item.name) {
                throw new Error("Nama item harus berupa string dan tidak boleh kosong");
            }
            if (typeof item.value !== 'string' || !item.value) {
                throw new Error("Value item harus berupa string dan tidak boleh kosong");
            }
            if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
                throw new Error("Quantity item harus berupa angka positif");
            }
            if (!Number.isInteger(item.discount) || item.discount <= 0) {
                throw new Error("Quantity item harus berupa angka positif");
            }
        });
        return true;
    }),
    // Memastikan bahwa storeId adalah string dan tidak kosong
    (0, express_validator_1.body)('storeId')
        .isString().withMessage("storeId harus berupa string")
        .notEmpty().withMessage("storeId tidak boleh kosong"),
];
