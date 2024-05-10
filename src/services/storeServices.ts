import { PrismaClient } from "@prisma/client";

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
  }
}

export default storeServices;