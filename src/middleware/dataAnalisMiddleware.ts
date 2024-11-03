import { Request, Response, NextFunction } from "express";
import userServices from '../services/userServices';

export const checkDataAnalis = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.getSpecificUser(req.user.user_id);
  if (!user) return res.status(401).json({ error: 'User not found' });

  // Memeriksa apakah pengguna memiliki peran yang diperlukan
  if (user.Role && user.Role.name === 'dataanalis') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
}