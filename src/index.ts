import express, { Request, Response } from "express";
import createHttpError from "http-errors";
import { createServer } from 'http';
import cors from "cors";
import { setupWebSocket, sendNotificationToUser } from './websocket';

const developmentCorsOptions: cors.CorsOptions = {
  origin: true, // Sesuaikan dengan URL frontend Next.js Anda
  credentials: true, // Izinkan cookies dan header lain yang diperlukan
};

const productionCorsOptions: cors.CorsOptions = {
  origin: 'https://so-kas.com',
  credentials: true, // Izinkan cookies dan header lain yang diperlukan
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
};

// const corsOptions = process.env.NODE_ENV === 'production' ? productionCorsOptions : developmentCorsOptions;

// router
import mainRouter from "./router";

const app = express();
const server = createServer(app);

app.use(cors(developmentCorsOptions));

app.use(express.json())

app.use('/', mainRouter);

app.use((req: Request, res: Response, next: Function) => {

  next(createHttpError(404))
})

setupWebSocket(server);

server.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:8000`)
})