import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import responseJson from '../utils/responseJson';
import { PrismaClient } from '@prisma/client';
import userServices from '../services/userServices';
import config from '../config';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json(responseJson("error", {}, "Access Denied. Token is missing"));

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}