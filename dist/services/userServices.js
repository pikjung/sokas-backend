"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userServices = {
    getSpecificUser(id) {
        return prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                Role: true
            }
        });
    },
    getAllusers() {
        return prisma.user.findMany({
            include: {
                Role: true
            }
        });
    },
    createUser(data) {
        return prisma.user.create({
            data
        });
    },
    updateUser(id, data) {
        return prisma.user.update({ where: { id }, data });
    },
    deleteUser(id) {
        return prisma.user.delete({ where: { id } });
    }
};
exports.default = userServices;
