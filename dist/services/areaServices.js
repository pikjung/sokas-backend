"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const areaServices = {
    getAllArea() {
        return prisma.area.findMany({
            include: {
                sales: true,
                sales_support: true,
                MasterArea: true
            }
        });
    },
    createArea(data) {
        return prisma.area.create({ data });
    },
    updateArea(id, data) {
        return prisma.area.update({ where: { id }, data });
    },
    deleteArea(id) {
        return prisma.area.delete({ where: { id } });
    }
};
exports.default = areaServices;
