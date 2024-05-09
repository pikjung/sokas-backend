import { PrismaClient } from "@prisma/client";
import xlsx from "xlsx";
import generateUniqueId from "../utils/generateId";

const prisma = new PrismaClient();

const productServices = {
  getAllProduct() {
    return prisma.product.findMany({
      include: {
        Brand: true,
      },
    });
  },

  createProduct(data: any) {
    return prisma.product.create({ data });
  },

  updateProduct(id: string, data: any) {
    return prisma.product.update({ where: { id }, data });
  },

  deleteProduct(id: string) {
    return prisma.product.delete({ where: { id } });
  },

  async upload(filePath: string) {
    try {
      const workbook = xlsx.readFile(filePath);
      const worksheet = workbook.Sheets["Sheet1"];
      const data = xlsx.utils.sheet_to_json(worksheet);

      const formattedData = data.map((item: any) => ({
        id: generateUniqueId(),
        name: item.name,
        value: item.value,
        brandId: item.brandId,
      }));

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
  },
};

export default productServices;
