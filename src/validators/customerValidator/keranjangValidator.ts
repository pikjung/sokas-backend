import { body } from "express-validator";

export const keranjangValidator = [
  body().isObject().withMessage("Keranjang harus berupa objek"),

  body().custom((value) => {
    const brandKeys = Object.keys(value);
    if (brandKeys.length === 0) {
      throw new Error("Keranjang tidak boleh kosong");
    }
    return true;
  }),

  body().custom((value) => {
    const brandKeys = Object.keys(value);

    brandKeys.forEach((key) => {
      const brand = value[key];
      if (!brand.brandId) {
        throw new Error(`brandId hilang untuk brand ${key}`);
      }
      if (!brand.items || !Array.isArray(brand.items)) {
        throw new Error(`items harus berupa array untuk brand ${key}`);
      }

      brand.items.forEach((item: any, index: number) => {
        if (!item.id) {
          throw new Error(`id hilang untuk item pada index ${index} dalam brand ${key}`);
        }
        if (!item.productId) {
          throw new Error(`productId hilang untuk item pada index ${index} dalam brand ${key}`);
        }
        if (typeof item.qty !== "number" || item.qty <= 0) {
          throw new Error(`qty harus berupa angka positif untuk item pada index ${index} dalam brand ${key}`);
        }
        if (!item.Product || !item.Product.id) {
          throw new Error(`Product.id hilang untuk item pada index ${index} dalam brand ${key}`);
        }
      });
    });

    return true;
  }),
]