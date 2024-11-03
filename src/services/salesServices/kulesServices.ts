
import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import axios from "axios";
import dotenv from 'dotenv';
import { startOfDay, endOfDay } from 'date-fns';

dotenv.config();

const prisma = new PrismaClient();

const kulesServices = {
  async addKules(id: string, data: any) {

    const kulesCheck = await prisma.kules.findFirst({
      where: {
        sales_id: id,
        storeId: data.storeId,
        date_kules: {
          gte: startOfDay(new Date()), // >= Start of today
          lt: endOfDay(new Date()) // < End of today
        }
      }
    })

    if (kulesCheck?.sales_id != null) {
      return { data: kulesCheck, message: "Data sudah terinput sebelumnya" }
    }

    const kules = await prisma.kules.create({
      data: {
        id: generateUniqueId(),
        sales_id: id,
        storeId: data.storeId,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
        note: data.note.toString(),
        date_kules: new Date(),
        isnoo: data.isnoo,
      }
    })
    return { data: kules, message: "data berhasil ditambahkan" }
  },

  async historyKules(id: string) {
    const kules = await prisma.kules.findMany({
      where: {
        sales_id: id,
      },
      include: {
        Sales: {
          select: {
            id: true,
            name: true,
          }
        },  // Include data `Sales` dari relasi
        Store: {
          select: {
            id: true,
            name: true,
          }
        },  // Include data `Store` dari relasi
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
    }, {} as Record<string, typeof kules>);

    return groupedByDate
  }
}

export default kulesServices;