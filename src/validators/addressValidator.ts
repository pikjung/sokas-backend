import { body } from "express-validator";

export const addressValidator = [
  body("name").notEmpty().withMessage('Nama harus di isi'),
]