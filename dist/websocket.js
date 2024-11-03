"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedUsers = exports.sendNotificationToUser = exports.setupWebSocket = void 0;
const ws_1 = __importDefault(require("ws"));
const client_1 = require("@prisma/client");
const clients = {};
const setupWebSocket = (server) => {
    const prisma = new client_1.PrismaClient();
    const wss = new ws_1.default.Server({ server });
    wss.on('connection', (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const userId = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[1]) === null || _b === void 0 ? void 0 : _b.split('=')[1];
        if (userId) {
            ws.userId = userId;
            try {
                const userDetails = yield prisma.user.findUnique({
                    select: {
                        name: true,
                        Role: {
                            select: {
                                name: true
                            }
                        }
                    },
                    where: { id: userId }
                });
                ws.userDetails = userDetails;
                clients[userId] = ws;
                console.log(`User ${userId} connected with details: ${JSON.stringify(userDetails)}`);
                ws.send(JSON.stringify({
                    type: 'USER_DETAILS',
                    data: userDetails
                }));
            }
            catch (error) {
                console.error(`Failed to get user details for ${userId}:`, error);
            }
            console.log('New client connected');
            ws.on('message', (message) => {
                console.log(`Received message: ${message}`);
                ws.send(`Server received: ${message}`);
            });
            ws.on('close', (code, reason) => {
                if (userId) {
                    delete clients[userId];
                    console.log(`User ${userId} disconnected. Code: ${code}, Reason: ${reason}`);
                }
                else {
                    console.log(`A client disconnected. Code: ${code}, Reason: ${reason}`);
                }
            });
        }
    }));
};
exports.setupWebSocket = setupWebSocket;
// Fungsi untuk mengirim notifikasi ke pengguna tertentu
const sendNotificationToUser = (userId, status, title, message) => {
    const client = clients[userId];
    if (client && client.readyState === ws_1.default.OPEN) {
        client.send(JSON.stringify({ message: message, status: status, title: title }));
    }
};
exports.sendNotificationToUser = sendNotificationToUser;
// Fungsi untuk mendapatkan daftar userId yang terkoneksi
const getConnectedUsers = () => {
    return Object.keys(clients);
};
exports.getConnectedUsers = getConnectedUsers;
