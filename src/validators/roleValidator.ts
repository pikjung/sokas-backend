import { body } from "express-validator";

export const roleValidator = [
  body('name').notEmpty().isLength({ min: 2 }).withMessage('Nama harus di isi')
]