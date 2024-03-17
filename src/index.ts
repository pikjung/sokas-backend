import express, { Request, Response } from "express";
import createHttpError from "http-errors";

// router
import mainRouter from "./router";

const app = express();

app.use(express.json())

app.use('/', mainRouter);

app.use((req: Request, res: Response, next: Function) => {
  next(createHttpError(404))
})

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:8000`)
})