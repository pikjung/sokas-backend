"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEditValidator = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isEmailUnique = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { email } });
    if (user) {
        throw new Error('Email sudah digunakan');
    }
});
const isUsernameUnique = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { username } });
    if (user) {
        throw new Error('Username sudah digunakan');
    }
});
exports.userEditValidator = [
    (0, express_validator_1.body)('name').notEmpty().isLength({ min: 3, max: 25 }).withMessage('Nama harus diisi'),
    (0, express_validator_1.body)('email').notEmpty().isEmail().withMessage('Email tidak valid').custom(isEmailUnique),
    (0, express_validator_1.body)('username').notEmpty().isLength({ min: 6, max: 25 }).withMessage('Username harus di isi').custom(isUsernameUnique),
];
