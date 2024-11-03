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
const dotenv_1 = __importDefault(require("dotenv"));
const date_fns_1 = require("date-fns");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const kulesServices = {
    addKules(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const kulesCheck = yield prisma.kules.findFirst({
                where: {
                    sales_id: id,
                    storeId: data.storeId,
                    date_kules: {
                        gte: (0, date_fns_1.startOfDay)(new Date()), // >= Start of today
                        lt: (0, date_fns_1.endOfDay)(new Date()) // < End of today
                    }
                }
            });
            if ((kulesCheck === null || kulesCheck === void 0 ? void 0 : kulesCheck.sales_id) != null) {
                return { data: kulesCheck, message: "Data sudah terinput sebelumnya" };
            }
            const kules = yield prisma.kules.create({
                data: {
                    id: (0, generateId_1.default)(),
                    sales_id: id,
                    storeId: data.storeId,
                    latitude: data.latitude.toString(),
                    longitude: data.longitude.toString(),
                    note: data.note.toString(),
                    date_kules: new Date(),
                    isnoo: data.isnoo,
                }
            });
            return { data: kules, message: "data berhasil ditambahkan" };
        });
    },
    historyKules(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const kules = yield prisma.kules.findMany({
                where: {
                    sales_id: id,
                },
                include: {
                    Sales: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }, // Include data `Sales` dari relasi
                    Store: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }, // Include data `Store` dari relasi
                },
                orderBy: {
                    date_kules: 'desc',
                },
            });
            // Grouping berdasarkan tanggal
            const groupedByDate = kules.reduce((acc, curr) => {
                const date = new Date(curr.date_kules).toISOString().split('T')[0]; // Ambil bagian tanggal saja (YYYY-MM-DD)
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(curr);
                return acc;
            }, {});
            return groupedByDate;
        });
    }
};
exports.default = kulesServices;
