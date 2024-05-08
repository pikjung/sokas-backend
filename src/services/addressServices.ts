import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const addressService = {
  getAllAddress() {
    return prisma.address.findMany()
  },

  createAddress(data: any) {
    return prisma.address.create({ data })
  },

  updateAddress(id: string, data: any) {
    return prisma.address.update({ where: { id }, data })
  },

  deleteAddress(id: string) {
    return prisma.address.delete({ where: { id } })
  }
}

export default addressService