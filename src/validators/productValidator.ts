import { body } from "express-validator";

export const productValidator = [
  body('name').notEmpty().isLength({ min: 3 }).withMessage("Nama Product harus di isi"),
  body('value').notEmpty().isLength({ min: 3 }).withMessage("Value harus di isi"),
  body('brandId').notEmpty().withMessage("Brand harus di pilih"),
]