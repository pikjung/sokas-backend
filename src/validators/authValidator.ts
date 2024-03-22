import { body } from "express-validator";

export const authValidator = [
  body('username').notEmpty().isLength({ min: 3 }).withMessage('username harus di isi'),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('password harus di isi')
]