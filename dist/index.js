"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const websocket_1 = require("./websocket");
const developmentCorsOptions = {
    origin: true, // Sesuaikan dengan URL frontend Next.js Anda
    credentials: true, // Izinkan cookies dan header lain yang diperlukan
};
const productionCorsOptions = {
    origin: 'https://so-kas.com',
    credentials: true, // Izinkan cookies dan header lain yang diperlukan
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
};
// const corsOptions = process.env.NODE_ENV === 'production' ? productionCorsOptions : developmentCorsOptions;
// router
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, cors_1.default)(developmentCorsOptions));
app.use(express_1.default.json());
app.use('/', router_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
(0, websocket_1.setupWebSocket)(server);
server.listen(8000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:8000`);
});
