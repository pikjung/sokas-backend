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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const historyServices = {
    getHistory(user_id) {
        return prisma.transaction.findMany({
            where: {
                processed_at: {
                    not: null
                },
                Store: {
                    Address: {
                        OR: [
                            {
                                tr: {
                                    sales_support_id: user_id
                                }
                            },
                            {
                                multi: {
                                    sales_support_id: user_id
                                }
                            }
                        ]
                    }
                }
            },
            include: {
                Store: {
                    include: {
                        Address: {
                            include: {
                                tr: true,
                                multi: true
                            }
                        }
                    }
                },
                Brand: true
            },
            orderBy: [
                {
                    created_at: 'desc',
                }
            ]
        });
    },
    getSpesificHistory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.transactionDetail.findMany({
                    where: {
                        transactionId: id
                    },
                    include: {
                        Product: true
                    }
                });
            }
            catch (error) {
                // Tangani kesalahan jika ada
                console.error('Error fetching transaction details or products:', error);
                throw error;
            }
        });
    },
};
exports.default = historyServices;