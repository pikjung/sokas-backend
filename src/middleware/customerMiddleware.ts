import { Request, Response, NextFunction } from "express";
import storeServices from '../services/storeServices';

export const checkCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const customer = await storeServices.getSpesificStore(req.user.user_id);
  if (!customer) return res.status(401).json({ error: 'User not found' });

  // Memeriksa apakah pengguna memiliki peran yang diperlukan
  if (customer) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
} 