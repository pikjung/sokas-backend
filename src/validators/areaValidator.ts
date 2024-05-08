import { body } from "express-validator";

export const areaValidator = [
  body('name').notEmpty().withMessage('Nama Area harus di isi'),
  body('masterAreaId').notEmpty().withMessage('Master Area harus di isi'),
  body('sales_id').notEmpty().withMessage('Nama sales harus di pilih'),
  body('sales_support_id').notEmpty().withMessage('Nama sales support harus di pilih'),
]