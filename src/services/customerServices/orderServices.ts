import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const orderServices = {
  getBrand() {
    return prisma.brand.findMany()
  },

  getProduct(brandId: string) {
    return prisma.product.findMany({
      where: {
        brandId: brandId
      }
    })
  },

  async addCart(data: any, user_id) {
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
      prisma.cart.create({ data })
    );
    await Promise.all(uploadData);

    return uploadData
  }
}

export default orderServices