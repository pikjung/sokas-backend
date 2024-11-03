import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import dotenv from 'dotenv';

dotenv.config()

const prisma = new PrismaClient()

function getStartAndEndOfMonth(date: Date): { start: Date, end: Date } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

const kulesServices = {
  getMapData(spv_id: string, startDate: string, endDate: string) {
    let start: Date, end: Date;

    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set end time to end of day
      console.log("Start:", start.toISOString());
      console.log("End:", end.toISOString());
    } else {
      // If no dates provided, default to current month
      const now = new Date();
      ({ start, end } = getStartAndEndOfMonth(now));
    }

    return prisma.masterArea.findFirst({
      where: {
        AND: [
          {
            spv_id: spv_id
          },
          {
            Area: {
              some: {
                sales: {
                  Kules: {
                    some: {
                      created_at: {
                        gte: start,
                        lte: end
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      },
      select: {
        Area: {
          select: {
            id: true,
            name: true,
            sales: {
              select: {
                id: true,
                name: true,
                Kules: {
                  select: {
                    id: true,
                    latitude: true,
                    longitude: true,
                    date_kules: true,
                    note: true,
                    storeId: true,
                    Store: {
                      select: {
                        id: true,
                        name: true,
                      }
                    }
                  },
                }
              }
            }
          }
        },
        name: true,
        spv: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

  },
}

export default kulesServices