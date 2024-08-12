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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
function generateTransactionId(brandId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ambil nilai 'value' dari tabel Brand
        const brand = yield prisma.brand.findUnique({
            where: { id: brandId },
            select: { value: true },
        });
        if (!brand) {
            throw new Error('Brand not found');
        }
        const brandValue = brand.value;
        // Ambil tahun dan bulan saat ini dalam format YYMM
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2); // YY
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // MM
        const yymm = `${year}${month}`;
        // Hitung jumlah transaksi pada bulan tersebut
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const transactionCount = yield prisma.transaction.count({
            where: {
                created_at: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });
        // Tambahkan 1 dan format menjadi 4 digit angka
        const transactionNumber = (transactionCount + 1).toString().padStart(4, '0');
        // Gabungkan semua komponen menjadi format BRAND-YYMMPREFIX
        const transactionId = `${brandValue}-${yymm}${transactionNumber}`;
        return transactionId;
    });
}
const keranjangServices = {
    getKeranjang(sales_id) {
        return prisma.cart.findMany({
            where: {
                sales_id: sales_id,
            },
            orderBy: [
                {
                    Store: {
                        name: 'desc'
                    }
                }
            ],
            include: {
                Store: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                Product: {
                    include: {
                        Brand: true
                    }
                }
            },
        });
    },
    deleteKeranjang(user_id, cartId) {
        return prisma.cart.delete({
            where: {
                id: cartId,
            }
        });
    },
    updateKeranjang(cartId, qty) {
        return prisma.cart.update({
            where: {
                id: cartId,
            },
            data: {
                qty: qty,
                updated_at: new Date()
            }
        });
    },
    updateDiscount(cartId, discount) {
        return prisma.cart.update({
            where: {
                id: cartId,
            },
            data: {
                discount: discount,
                updated_at: new Date()
            }
        });
    },
    addTransactions(user_id, keranjang) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield prisma.user.findUnique({
                    select: {
                        name: true
                    },
                    where: {
                        id: user_id
                    }
                });
                if (!sales) {
                    throw new Error('Sales tidak ditemukan');
                }
                let message = `Transaksi baru dari sales: <b>${sales.name}</b>\n`;
                const storeKeys = Object.keys(keranjang);
                const addStorePromises = storeKeys.map((storeKey) => __awaiter(this, void 0, void 0, function* () {
                    const store = keranjang[storeKey];
                    message += `-Toko: <b>${store.storeName}</b>\n`;
                    const brandKeys = Object.keys(store.brands);
                    const addDataPromises = brandKeys.map((brandKey) => __awaiter(this, void 0, void 0, function* () {
                        const item = store.brands[brandKey];
                        const orderno = yield generateTransactionId(item.brandId);
                        // Membuat transaksi
                        const transaction = yield prisma.transaction.create({
                            data: {
                                id: (0, generateId_1.default)(),
                                order_no: orderno,
                                storeId: store.storeId,
                                brandId: item.brandId,
                                created_by: user_id,
                                isSales: "Y",
                                userId: user_id,
                                salesNote: item.salesNote
                            },
                        });
                        // Menambahkan detail transaksi untuk setiap produk
                        const itemsAddPromises = item.items.map((produk) => __awaiter(this, void 0, void 0, function* () {
                            yield prisma.cart.delete({ where: { id: produk.id } });
                            return yield prisma.transactionDetail.create({
                                data: {
                                    id: (0, generateId_1.default)(),
                                    qty: produk.qty,
                                    transactionId: transaction.id,
                                    productId: produk.Product.id,
                                    discount: produk.discount
                                },
                            });
                        }));
                        // Menunggu hingga semua detail transaksi selesai ditambahkan
                        yield Promise.all(itemsAddPromises);
                    }));
                    // Menunggu hingga semua transaksi selesai dibuat
                    yield Promise.all(addDataPromises);
                }));
                // Menunggu hingga semua toko diproses
                const result = yield Promise.all(addStorePromises);
                const token = process.env.BOT_TOKEN; // Mengambil token dari environment variable
                if (!token) {
                    throw new Error('TELEGRAM_BOT_TOKEN is not defined');
                }
                const url = `https://api.telegram.org/bot${token}/sendMessage`;
                try {
                    yield axios_1.default.post(url, {
                        chat_id: '-1002201031910',
                        text: message,
                        parse_mode: 'HTML'
                    });
                }
                catch (error) {
                    console.error('Error sending notification:', error);
                }
                return result;
            }
            catch (error) {
                console.error("Error adding to cart:", error);
                throw new Error("Failed to add items to cart.");
            }
        });
    }
};
exports.default = keranjangServices;
