import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userServices = {

  getSpecificUser(id: string) {
    return prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        Role: true
      }
    })
  },

  getAllusers() {
    return prisma.user.findMany({
      include: {
        Role: true
      }
    })
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
