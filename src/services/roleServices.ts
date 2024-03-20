import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roleService = {
  getAllRole() {
    return prisma.role.findMany()
  },

  createRole(data: any) {
    return prisma.role.create({ data });
  },

  updateRole(id: string, data: any) {
    return prisma.role.update({ where: { id }, data });
  },

  deleteRole(id: string) {
    return prisma.role.delete({ where: { id } });
  }
}

export default roleService
