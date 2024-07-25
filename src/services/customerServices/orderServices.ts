import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const orderServices = {
  getBrand() {
    return prisma.brand.findMany({
      select: {
        id: true,
        name: true,
      }
    });
  },

  getProduct(brandId: string) {
    return prisma.product.findMany({
      select: {
        id: true,
        name: true,
        value: true
      },
      where: {
        brandId: brandId,
      },
    });
  },

  async addCart(data: any[], user_id: string) {
    try {
      const addData = data.map(async (item: any) => {
        return await prisma.cart.create({
          data: {
            id: generateUniqueId(),
            storeId: user_id,
            productId: item.id,
            qty: Number(item.quantity),
          },
        });
      });

      const result = await Promise.all(addData);
      return result;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error("Failed to add items to cart.");
    }
  }
};

export default orderServices;
