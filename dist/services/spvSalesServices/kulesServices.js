"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
function getStartAndEndOfMonth(date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
}
const kulesServices = {
    getMapData(spv_id, startDate, endDate) {
        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // Set end time to end of day
            console.log("Start:", start.toISOString());
            console.log("End:", end.toISOString());
        }
        else {
            // If no dates provided, default to current month
            const now = new Date();
            ({ start, end } = getStartAndEndOfMonth(now));
        }
        return prisma.masterArea.findFirst({
            where: {
                AND: [
                    {
                        spv_id: spv_id
                    },
                    {
                        Area: {
                            some: {
                                sales: {
                                    Kules: {
                                        some: {
                                            created_at: {
                                                gte: start,
                                                lte: end
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                Area: {
                    select: {
                        id: true,
                        name: true,
                        sales: {
                            select: {
                                id: true,
                                name: true,
                                Kules: {
                                    select: {
                                        id: true,
                                        latitude: true,
                                        longitude: true,
                                        date_kules: true,
                                        note: true,
                                        storeId: true,
                                        Store: {
                                            select: {
                                                id: true,
                                                name: true,
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                name: true,
                spv: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
    },
};
exports.default = kulesServices;
