import { PrismaClient } from "@prisma/client";
import xlsx from "xlsx";
import generateUniqueId from "../utils/generateId";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

const storeServices = {
  getAllStore() {
    return prisma.store.findMany({
      include: {
        Address: true,
      }
    })
  },

  getSpesificStore(id: string) {
    return prisma.store.findUnique({
      where: {
        id: id
      }
    })
  },

  createStore(data: any) {
    return prisma.store.create({ data })
  },

  updateStore(id: string, data: any) {
    return prisma.store.update({ where: { id }, data })
  },

  deleteStore(id: string) {
    return prisma.store.delete({ where: { id } })
  },

  async upload(filePath: string) {
    try {
      const workbook = xlsx.readFile(filePath);
      const worksheet = workbook.Sheets["Sheet1"];
      const data = xlsx.utils.sheet_to_json(worksheet);

      const formattedDataPromises = data.map(async (item: any) => {
        const hashedPassword = await bcrypt.hash(item.password, 10);
        return {
          id: generateUniqueId(),
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
      });

      const formattedData = await Promise.all(formattedDataPromises);
      const uploadData = formattedData.map((data: any) =>
        prisma.product.create({ data })
      );
      await Promise.all(uploadData);

      return {
        success: true,
        data: uploadData,
      };
    } catch (error) {
      return error;
    }
  }
}

export default storeServices;