import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();


async function generateTransactionId(brandId: any): Promise<string> {
  // Ambil nilai 'value' dari tabel Brand
  const brand = await prisma.brand.findUnique({
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

  const transactionCount = await prisma.transaction.count({
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
}

const keranjangServices = {
  getKeranjang(sales_id: string) {
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
    })
  },

  deleteKeranjang(user_id: string, cartId: string) {
    return prisma.cart.delete({
      where: {
        id: cartId,
      }
    })
  },

  updateKeranjang(cartId: string, qty: number) {
    return prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        qty: qty,
        updated_at: new Date()
      }
    })
  },

  updateDiscount(cartId: string, discount: number) {
    return prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        discount: discount,
        updated_at: new Date()
      }
    })
  },

  async addTransactions(user_id: string, keranjang: any) {
    try {

      const sales = await prisma.user.findUnique({
        select: {
          name: true
        },
        where: {
          id: user_id
        }
      })

      if (!sales) {
        throw new Error('Sales tidak ditemukan');
      }

      let message = `Transaksi baru dari sales: <b>${sales.name}</b>\n`;

      const storeKeys = Object.keys(keranjang);

      const addStorePromises = storeKeys.map(async (storeKey) => {
        const store = keranjang[storeKey];

        message += `-Toko: <b>${store.storeName}</b>\n`

        const brandKeys = Object.keys(store.brands);
        const addDataPromises = brandKeys.map(async (brandKey) => {
          const item = store.brands[brandKey];
          const orderno = await generateTransactionId(item.brandId);

          // Membuat transaksi
          const transaction = await prisma.transaction.create({
            data: {
              id: generateUniqueId(),
              order_no: orderno,
              storeId: store.storeId,
              brandId: item.brandId,
              created_by: user_id,
              isSales: "Y",
              userId: user_id,
            },
          });

          // Menambahkan detail transaksi untuk setiap produk
          const itemsAddPromises = item.items.map(async (produk: any) => {
            await prisma.cart.delete({ where: { id: produk.id } });
            return await prisma.transactionDetail.create({
              data: {
                id: generateUniqueId(),
                qty: produk.qty,
                transactionId: transaction.id,
                productId: produk.Product.id,
                discount: produk.discount
              },
            });
          });

          // Menunggu hingga semua detail transaksi selesai ditambahkan
          await Promise.all(itemsAddPromises);
        });

        // Menunggu hingga semua transaksi selesai dibuat
        await Promise.all(addDataPromises);
      });

      // Menunggu hingga semua toko diproses
      const result = await Promise.all(addStorePromises)

      const token = process.env.BOT_TOKEN; // Mengambil token dari environment variable
      if (!token) {
        throw new Error('TELEGRAM_BOT_TOKEN is not defined');
      }
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      try {
        await axios.post(url, {
          chat_id: '-1002167373709',
          text: message,
          parse_mode: 'HTML'
        });
      } catch (error) {
        console.error('Error sending notification:', error);
      }

      return result
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error("Failed to add items to cart.");
    }
  }
}

export default keranjangServices