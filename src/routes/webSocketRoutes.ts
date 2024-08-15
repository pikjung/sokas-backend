
import express, { Router } from "express";
import { sendNotificationToUser } from "../websocket";
import { Request, Response } from "express";

const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { userId, notification } = req.body;
  sendNotificationToUser(userId, notification);
  res.status(200).send('Notification sent');
});

export default router;

