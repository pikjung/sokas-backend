import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const brandServices = {
  getAllbrand() {
    return prisma.brand.findMany()
  },

  createBrand(data: any) {
    return prisma.brand.create({ data })
  },

  updateBrand(id: string, data: any) {
    return prisma.brand.update({ where: { id }, data })
  },

  deleteBrand(id: string) {
    return prisma.brand.delete({ where: { id } })
  }
}

export default brandServices;