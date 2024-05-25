import { body } from "express-validator";

export const storeEditValidator = [
  body('name').notEmpty().withMessage("Nama store harus di isi"),
  body('kode').notEmpty().withMessage("Kode harus di isi"),
  body('full_address').notEmpty().withMessage("Alamat lengkap harus di isi")
]