"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const brandServices = {
    getAllbrand() {
        return prisma.brand.findMany();
    },
    createBrand(data) {
        return prisma.brand.create({ data });
    },
    updateBrand(id, data) {
        return prisma.brand.update({ where: { id }, data });
    },
    deleteBrand(id) {
        return prisma.brand.delete({ where: { id } });
    }
};
exports.default = brandServices;
