import { body } from "express-validator";

export const masterAreaValidator = [
  body('name').notEmpty().withMessage('Nama Area harus di isi')
]