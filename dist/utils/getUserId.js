"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// export const getRoleFromToken = (token: string): string | null => {
//   try {
//     const decoded = jwt.decode(token);
//     return decoded?.user?.role || null;
//   } catch (error) {
//     console.error('Failed to decode token', error);
//     return null;
//   }
// };
const getUserIdFromToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        return decoded;
    }
    catch (error) {
        console.error('Failed to decode token', error);
        return null;
    }
};
exports.getUserIdFromToken = getUserIdFromToken;
