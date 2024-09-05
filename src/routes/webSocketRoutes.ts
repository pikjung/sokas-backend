
import express, { Router } from "express";
import { sendNotificationToUser, getConnectedUsers } from "../websocket";
import { Request, Response } from "express";

const router: Router = express.Router();

router.post('/send-notifications', (req: Request, res: Response) => {
  const { userId, status, title, message } = req.body;
  sendNotificationToUser(userId, status, title, message);
  res.status(200).send('Notification sent');
});

router.get('/connected-users', (req: Request, res: Response) => {
  const connectedUsers = getConnectedUsers();
  res.json(connectedUsers);
});

export default router;

