import express, { Request, Response, Router } from "express";
import getUsers from "../services/userServices";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const getUser = await getUsers();
  res.json(getUser);
});

export default router;
