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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDataAnalis = void 0;
const userServices_1 = __importDefault(require("../services/userServices"));
const checkDataAnalis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userServices_1.default.getSpecificUser(req.user.user_id);
    if (!user)
        return res.status(401).json({ error: 'User not found' });
    // Memeriksa apakah pengguna memiliki peran yang diperlukan
    if (user.Role && user.Role.name === 'dataanalis') {
        next();
    }
    else {
        res.status(403).json({ error: 'Unauthorized' });
    }
});
exports.checkDataAnalis = checkDataAnalis;
