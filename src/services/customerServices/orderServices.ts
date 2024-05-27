import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const orderServices = {
  getBrand() {
    return prisma.brand.findMany();
  },

  getProduct(brandId: string) {
    return prisma.product.findMany({
      where: {
        brandId: brandId,
      },
    });
  },

  async addCart(data: any[], user_id: string) {
    const addData = data.map((item: any) =>
      prisma.cart.create({
        data: {
          id: generateUniqueId(),
          storeId: user_id,
          productId: item.id,
          qty: Number(item.qty),
        },
      })
    );

    const result = await Promise.all(addData);
    return result;
  },
};

export default orderServices;
