"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const masterAreaServices = {
    getAllMasterArea() {
        return prisma.masterArea.findMany({
            include: {
                spv: true
            }
        });
    },
    createMasterArea(data) {
        return prisma.masterArea.create({ data });
    },
    updateMasterArea(id, data) {
        return prisma.masterArea.update({ where: { id }, data });
    },
    deleteMasterArea(id) {
        return prisma.masterArea.delete({ where: { id } });
    }
};
exports.default = masterAreaServices;
