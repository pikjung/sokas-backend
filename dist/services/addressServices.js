"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addressService = {
    getAllAddress() {
        return prisma.address.findMany({
            include: {
                tr: true,
                multi: true,
            },
        });
    },
    createAddress(data) {
        return prisma.address.create({ data });
    },
    updateAddress(id, data) {
        return prisma.address.update({ where: { id }, data });
    },
    deleteAddress(id) {
        return prisma.address.delete({ where: { id } });
    },
};
exports.default = addressService;
