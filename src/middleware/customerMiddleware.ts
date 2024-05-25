import { Request, Response, NextFunction } from "express";
import storeServices from '../services/storeServices';

export const checkCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const user = await storeServices.getSpesificStore(req.user.user_id);
  if (!user) return res.status(401).json({ error: 'User not found' });

  // Memeriksa apakah pengguna memiliki peran yang diperlukan
  if (user) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
}