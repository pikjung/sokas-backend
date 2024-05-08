import { body } from "express-validator";
import path from 'path';

export const fileUploadValidator = [
  body('excelFile').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Silakan pilih file Excel');
    }
    const extname = path.extname(req.file.originalname);
    if (extname !== '.xlsx') {
      throw new Error('Hanya file XLSX yang diperbolehkan');
    }
    return true;
  })
]