import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const historyServices = {
  getHistory(user_id: string) {
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
    })
  },

  async getSpesificHistory(id: string) {
    try {
      return await prisma.transactionDetail.findMany({
        where: {
          transactionId: id
        },
        include: {
          Product: true
        }
      });
    } catch (error) {
      // Tangani kesalahan jika ada
      console.error('Error fetching transaction details or products:', error);
      throw error;
    }
  },
}

export default historyServices