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
    getKeranjang(storeId) {
        return prisma.cart.findMany({
            where: {
                storeId: storeId,
            },
            include: {
                Product: {
                    include: {
                        Brand: true
                    }
                }
            }
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
    addTransactions(user_id, keranjang) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Mendapatkan array dari objek keranjang
                const brandKeys = Object.keys(keranjang);
                // Memetakan setiap merek untuk membuat transaksi
                const addDataPromises = brandKeys.map((brandKey) => __awaiter(this, void 0, void 0, function* () {
                    const item = keranjang[brandKey];
                    const orderno = yield generateTransactionId(item.brandId);
                    // Membuat transaksi
                    const transaction = yield prisma.transaction.create({
                        data: {
                            id: (0, generateId_1.default)(),
                            order_no: orderno,
                            storeId: user_id,
                            brandId: item.brandId,
                            created_by: user_id,
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
                            },
                        });
                    }));
                    // Menunggu hingga semua detail transaksi selesai ditambahkan
                    yield Promise.all(itemsAddPromises);
                }));
                // Menunggu hingga semua transaksi selesai dibuat
                const result = yield Promise.all(addDataPromises);
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
