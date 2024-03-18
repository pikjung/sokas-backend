import express, { Request, Response } from "express";
import createHttpError from "http-errors";
import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3000', // Sesuaikan dengan URL frontend Next.js Anda
  credentials: true, // Izinkan cookies dan header lain yang diperlukan
};


// router
import mainRouter from "./router";

const app = express();

app.use(cors(corsOptions));

app.use(express.json())

app.use('/', mainRouter);

app.use((req: Request, res: Response, next: Function) => {

  next(createHttpError(404))
})

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:8000`)
})