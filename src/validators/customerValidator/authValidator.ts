import { body } from "express-validator";

export const authValidator = [
  body('kode').notEmpty().isLength({ min: 3 }).withMessage('kode toko harus di isi'),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('password harus di isi')
]