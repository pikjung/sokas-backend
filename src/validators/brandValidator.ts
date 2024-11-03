import { body } from "express-validator";

export const brandValidator = [
  body('name').notEmpty().isLength({ min: 3 }).withMessage('Brand harus di isi'),
  body('color').notEmpty().isLength({ min: 3 }).withMessage('Warna harus di isi'),
  body('value').notEmpty().isLength({ min: 3 }).withMessage('Value harus di isi'),
  body('trx_organization').notEmpty().isLength({ min: 3 }).withMessage('Value harus di isi'),
]