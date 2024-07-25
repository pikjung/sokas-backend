import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";

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
  getKeranjang(storeId: string) {
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

  async addTransactions(user_id: string, keranjang: any) {
    try {
      // Mendapatkan array dari objek keranjang
      const brandKeys = Object.keys(keranjang);

      // Memetakan setiap merek untuk membuat transaksi
      const addDataPromises = brandKeys.map(async (brandKey) => {
        const item = keranjang[brandKey];
        const orderno = await generateTransactionId(item.brandId);

        // Membuat transaksi
        const transaction = await prisma.transaction.create({
          data: {
            id: generateUniqueId(),
            order_no: orderno,
            storeId: user_id,
            brandId: item.brandId,
            created_by: user_id,
          },
        });

        // Menambahkan detail transaksi untuk setiap produk
        const itemsAddPromises = item.items.map(async (produk: any) => {
          await prisma.cart.delete({ where: { id: produk.id } })
          return await prisma.transactionDetail.create({
            data: {
              id: generateUniqueId(),
              qty: produk.qty,
              transactionId: transaction.id,
              productId: produk.Product.id,
            },
          });
        });

        // Menunggu hingga semua detail transaksi selesai ditambahkan
        await Promise.all(itemsAddPromises);


      });

      // Menunggu hingga semua transaksi selesai dibuat
      const result = await Promise.all(addDataPromises);
      return result;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error("Failed to add items to cart.");
    }
  }
}

export default keranjangServices