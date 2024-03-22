import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { validationResult } from 'express-validator';

import responseJson from '../utils/responseJson';

const prisma = new PrismaClient();

const authController = {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) return res.status(401).json(responseJson("error", {}, "Username atau password salah"))

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json(responseJson("error", {}, "Invalid Password"))

    const token = jwt.sign({ user_id: user.id }, config.jwtSecret, { expiresIn: '2h' })
    res.status(200).json(responseJson("success", token, "berhasil login"))
  },

  async logout(req: Request, res: Response) { },

  // async checkToken(req: Request, res: Response) {
  //   const token = req
  // }
}

export default authController