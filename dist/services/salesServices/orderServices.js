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
const generateId_1 = __importDefault(require("../../utils/generateId"));
const prisma = new client_1.PrismaClient();
const orderServices = {
    getBrand() {
        return prisma.brand.findMany({
            select: {
                id: true,
                name: true
            }
        });
    },
    getProduct(brandId) {
        return prisma.product.findMany({
            select: {
                id: true,
                name: true,
                value: true
            },
            where: {
                brandId: brandId,
            },
        });
    },
    addCart(data, storeId, sales_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addData = data.map((item) => __awaiter(this, void 0, void 0, function* () {
                    return yield prisma.cart.create({
                        data: {
                            id: (0, generateId_1.default)(),
                            storeId: storeId,
                            productId: item.id,
                            qty: Number(item.quantity),
                            isSales: "Y",
                            sales_id: sales_id,
                            discount: item.discount,
                        },
                    });
                }));
                const result = yield Promise.all(addData);
                return result;
            }
            catch (error) {
                console.error("Error adding to cart:", error);
                throw new Error("Failed to add items to cart.");
            }
        });
    },
    getToko(id) {
        const store = prisma.store.findMany({
            select: {
                id: true,
                name: true,
            },
            where: {
                Address: {
                    OR: [
                        {
                            tr: {
                                sales_id: id,
                            },
                        },
                        {
                            multi: {
                                sales_id: id,
                            },
                        },
                    ],
                }
            }
        });
        return store;
    }
};
exports.default = orderServices;
