import { body } from "express-validator";

export const kulesValidator = [
  body('isnoo')
    .isBoolean()
    .withMessage('isnoo harus berupa nilai boolean (true/false)'),

  // Validasi untuk storeId yang hanya diterapkan jika isnoo bernilai false
  body('storeId')
    .if((value, { req }) => req.body.isnoo === false)
    .notEmpty()
    .withMessage('Toko harus di isi'),

  // Validasi untuk latitude
  body('latitude')
    .notEmpty()
    .withMessage('Latitude harus di isi'),

  // Validasi untuk longitude
  body('longitude')
    .notEmpty()
    .withMessage('Longitude harus di pilih')
];
