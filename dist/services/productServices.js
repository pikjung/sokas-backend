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
const client_1 = require("@prisma/client");
const xlsx_1 = __importDefault(require("xlsx"));
const generateId_1 = __importDefault(require("../utils/generateId"));
const prisma = new client_1.PrismaClient();
const productServices = {
    getAllProduct() {
        return prisma.product.findMany({
            include: {
                Brand: true,
            },
        });
    },
    createProduct(data) {
        return prisma.product.create({ data });
    },
    updateProduct(id, data) {
        return prisma.product.update({ where: { id }, data });
    },
    deleteProduct(id) {
        return prisma.product.delete({ where: { id } });
    },
    upload(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workbook = xlsx_1.default.readFile(filePath);
                const worksheet = workbook.Sheets["Sheet1"];
                const data = xlsx_1.default.utils.sheet_to_json(worksheet);
                const formattedData = data.map((item) => ({
                    id: (0, generateId_1.default)(),
                    name: item.name,
                    value: item.value,
                    brandId: item.brandId,
                }));
                const uploadData = formattedData.map((data) => prisma.product.create({ data }));
                yield Promise.all(uploadData);
                return {
                    success: true,
                    data: uploadData,
                };
            }
            catch (error) {
                return error;
            }
        });
    },
};
exports.default = productServices;
