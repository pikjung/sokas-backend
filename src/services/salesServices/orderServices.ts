import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const orderServices = {
  getBrand() {
    return prisma.brand.findMany({
      select: {
        id: true,
        name: true
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

  async addCart(data: any[], storeId: string, sales_id: string) {
    try {
      const addData = data.map(async (item: any) => {
        return await prisma.cart.create({
          data: {
            id: generateUniqueId(),
            storeId: storeId,
            productId: item.id,
            qty: Number(item.quantity),
            isSales: "Y",
            sales_id: sales_id,
            discount: Number(item.discount)
          },
        });
      });

      const result = await Promise.all(addData);
      return result;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error("Failed to add items to cart.");
    }
  },

  getToko(id: string) {
    const store = prisma.store.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        Address: {
          OR: [
            {
              tr: {
                sales_id: id,
              },
            },
            {
              multi: {
                sales_id: id,
              },
            },
          ],
        }
      }
    })

    return store
  }
};

export default orderServices;
