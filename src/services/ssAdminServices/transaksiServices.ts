import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transaksiServices = {
  getTransaksiBySS(user_id: string) {
    return prisma.transaction.findMany({
      where: {
        processed_at: null,
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
    })
  },

  async getSpesificTransaksi(id: string, brandId: string) {
    try {
      // Menunggu hasil dari kedua query
      const detail = await prisma.transactionDetail.findMany({
        where: {
          transactionId: id
        },
        include: {
          Product: true
        }
      });

      const product = await prisma.product.findMany({
        where: {
          brandId: brandId
        }
      });

      // // Log hasil untuk debugging
      // console.log('Detail:', detail);
      // console.log('Product:', product);

      return { detail, product };
    } catch (error) {
      // Tangani kesalahan jika ada
      console.error('Error fetching transaction details or products:', error);
      throw error;
    }
  },

  cancelTransaksi(id: string) {
    return prisma.transaction.update({
      where: {
        id: id
      },
      data: {
        isCancel: "Y",
        processed_at: new Date(),
        updated_at: new Date()
      }
    })
  },

  confirmTransaksi(id: string, data: any, noted: string) {
    return prisma.transaction.update({
      where: {
        id: id
      },
      data: {
        processed_at: new Date(),
        isCancel: "N",
        noted: noted,
        updated_at: new Date(),
        TransactionDetail: {
          updateMany: data.map((detail: any) => ({
            where: { id: detail.id },
            data: {
              qty: Number(detail.qty),
              discount: Number(detail.discount),
            }
          }))
        }
      }
    });
  }
}

export default transaksiServices