import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userServices = {
  getAllusers() {
    return prisma.user.findMany()
  },

  createUser(data: any) {
    return prisma.user.create({
      data
    })
  },

  updateUser(id: string, data: any) {
    return prisma.user.update({ where: { id }, data })
  },

  deleteUser(id: string) {
    return prisma.user.delete({ where: { id } })
  }

}


export default userServices;
