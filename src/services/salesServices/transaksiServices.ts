import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

function getStartAndEndOfMonth(date: Date): { start: Date, end: Date } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}


const transaksiServices = {
  async getTransaksi(user_id: string, startDate?: string, endDate?: string) {
    let start: Date, end: Date;

    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set end time to end of day
    } else {
      // If no dates provided, default to current month
      const now = new Date();
      ({ start, end } = getStartAndEndOfMonth(now));
    }

    return await prisma.transaction.findMany({
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
  }
}

export default transaksiServices