import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

interface roleData {
  name: string;
}

export default async function getRoles() {
  const roles = await prisma.role.findMany()
  return roles
}

export async function createRole(body: roleData) {
  try {
    const createRole = await prisma.role.create({
      data: {
        id: uuid(),
        name: body.name
      }
    })
    return createRole;
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect();
  }
}
