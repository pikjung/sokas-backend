import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

import responseJson from '../utils/responseJson';

const prisma = new PrismaClient();

const authController = {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) return res.status(401).json(responseJson("error", {}, "Username atau password salah"))

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json(responseJson("error", {}, "Invalid Password"))

    const token = jwt.sign({ user_id: user.id }, config.jwtSecret, { expiresIn: '2h' })
    res.status(200).json(responseJson("success", token, "Berhasil Login"))
  },

  async logout(req: Request, res: Response) { }
}

export default authController