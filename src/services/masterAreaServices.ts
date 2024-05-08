import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const masterAreaServices = {
  getAllMasterArea() {
    return prisma.masterArea.findMany({
      include: {
        spv: true
      }
    })
  },

  createMasterArea(data: any) {
    return prisma.masterArea.create({ data })
  },

  updateMasterArea(id: string, data: any) {
    return prisma.masterArea.update({ where: { id }, data })
  },

  deleteMasterArea(id: string) {
    return prisma.masterArea.delete({ where: { id } })
  }
}

export default masterAreaServices