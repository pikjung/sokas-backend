import { body } from "express-validator";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const isEmailUnique = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new Error('Email sudah digunakan');
  }
};

const isUsernameUnique = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    throw new Error('Username sudah digunakan');
  }
};

export const userEditValidator = [
  body('name').notEmpty().isLength({ min: 3, max: 25 }).withMessage('Nama harus diisi'),
  body('email').notEmpty().isEmail().withMessage('Email tidak valid').custom(isEmailUnique),
  body('username').notEmpty().isLength({ min: 6, max: 25 }).withMessage('Username harus di isi').custom(isUsernameUnique),
]