import { body } from "express-validator";

export const keranjangValidator = [
  body().isObject().withMessage("Keranjang harus berupa objek"),

  body().custom((value) => {
    const storeKeys = Object.keys(value);
    if (storeKeys.length === 0) {
      throw new Error("Keranjang tidak boleh kosong");
    }
    return true;
  }),

  body().custom((value) => {
    const storeKeys = Object.keys(value);

    storeKeys.forEach((storeKey) => {
      const store = value[storeKey];

      if (!store.storeId) {
        throw new Error(`storeId hilang untuk ${storeKey}`);
      }

      if (!store.brands || typeof store.brands !== 'object' || Object.keys(store.brands).length === 0) {
        throw new Error(`brands harus berupa objek dan tidak boleh kosong untuk ${storeKey}`);
      }

      const brandKeys = Object.keys(store.brands);

      brandKeys.forEach((brandKey) => {
        const brand = store.brands[brandKey];

        if (!brand.brandId) {
          throw new Error(`brandId hilang untuk ${brandKey} dalam store ${storeKey}`);
        }

        if (!brand.items || !Array.isArray(brand.items) || brand.items.length === 0) {
          throw new Error(`items harus berupa array dan tidak boleh kosong untuk brand ${brandKey} dalam store ${storeKey}`);
        }

        brand.items.forEach((item: any, index: number) => {
          if (!item.id) {
            throw new Error(`id hilang untuk item pada index ${index} dalam brand ${brandKey} dalam store ${storeKey}`);
          }
          if (!item.productId) {
            throw new Error(`productId hilang untuk item pada index ${index} dalam brand ${brandKey} dalam store ${storeKey}`);
          }
          if (typeof item.qty !== "number" || item.qty <= 0) {
            throw new Error(`qty harus berupa angka positif untuk item pada index ${index} dalam brand ${brandKey} dalam store ${storeKey}`);
          }
          if (!item.Product || !item.Product.id) {
            throw new Error(`Product.id hilang untuk item pada index ${index} dalam brand ${brandKey} dalam store ${storeKey}`);
          }
        });
      });
    });

    return true;
  }),
];