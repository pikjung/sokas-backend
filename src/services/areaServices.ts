import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const areaServices = {
  getAllArea() {
    return prisma.area.findMany({
      include: {
        sales: true,
        sales_support: true,
        MasterArea: true
      }
    })
  },

  createArea(data: any) {
    return prisma.area.create({ data })
  },

  updateArea(id: string, data: any) {
    return prisma.area.update({ where: { id }, data })
  },

  deleteArea(id: string) {
    return prisma.area.delete({ where: { id } })
  }
}

export default areaServices