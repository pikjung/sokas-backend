"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const roleService = {
    getAllRole() {
        return prisma.role.findMany();
    },
    createRole(data) {
        return prisma.role.create({ data });
    },
    updateRole(id, data) {
        return prisma.role.update({ where: { id }, data });
    },
    deleteRole(id) {
        return prisma.role.delete({ where: { id } });
    }
};
exports.default = roleService;
