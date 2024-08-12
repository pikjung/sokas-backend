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
function getStartAndEndOfMonth(date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
}
const transaksiServices = {
    getTransaksi(user_id, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            let start, end;
            if (startDate && endDate) {
                start = new Date(startDate);
                end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // Set end time to end of day
            }
            else {
                // If no dates provided, default to current month
                const now = new Date();
                ({ start, end } = getStartAndEndOfMonth(now));
            }
            return yield prisma.transaction.findMany({
                where: {
                    created_at: {
                        gte: start,
                        lte: end
                    },
                    created_by: user_id
                },
                include: {
                    Brand: true,
                    Store: true,
                },
                orderBy: [
                    {
                        created_at: 'desc',
                    }
                ]
            });
        });
    }
};
exports.default = transaksiServices;
