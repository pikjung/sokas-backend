import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import responseJson from '../utils/responseJson';

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

  try {
    const decode = jwt.verify(token, config.jwtSecret)
    req.user = decode
    next()
  } catch (error) {
    return res.status(500).json(responseJson("error", {}, "Invalid token"))
  }
}