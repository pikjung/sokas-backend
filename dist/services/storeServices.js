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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const storeServices = {
    getAllStore() {
        return prisma.store.findMany({
            include: {
                Address: true,
            }
        });
    },
    getSpesificStore(id) {
        return prisma.store.findUnique({
            where: {
                id: id
            }
        });
    },
    createStore(data) {
        return prisma.store.create({ data });
    },
    updateStore(id, data) {
        return prisma.store.update({ where: { id }, data });
    },
    deleteStore(id) {
        return prisma.store.delete({ where: { id } });
    },
    upload(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workbook = xlsx_1.default.readFile(filePath);
                const worksheet = workbook.Sheets["Sheet1"];
                const data = xlsx_1.default.utils.sheet_to_json(worksheet);
                const formattedDataPromises = data.map((item) => __awaiter(this, void 0, void 0, function* () {
                    const hashedPassword = yield bcrypt_1.default.hash(item.password, 10);
                    return {
                        id: (0, generateId_1.default)(),
                        name: item.name,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        no_telp: item.no_telp,
                        kode: item.kode,
                        term_of_payment: item.term_of_payment,
                        password: hashedPassword,
                        full_address: item.full_address,
                        addressId: item.addressId,
                    };
                }));
                const formattedData = yield Promise.all(formattedDataPromises);
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
    }
};
exports.default = storeServices;
