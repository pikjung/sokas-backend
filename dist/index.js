"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
// const developmentCorsOptions: cors.CorsOptions = {
//   origin: true, // Sesuaikan dengan URL frontend Next.js Anda
//   credentials: true, // Izinkan cookies dan header lain yang diperlukan
// };
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
app.use((0, cors_1.default)(productionCorsOptions));
app.use(express_1.default.json());
app.use('/', router_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
app.listen(8000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:8000`);
});
