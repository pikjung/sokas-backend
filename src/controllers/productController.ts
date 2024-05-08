import generateUniqueId from "../utils/generateId";
import productServices from "../services/productServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    if (extname === '.xls' || extname === '.xlsx') {
      return cb(null, true);
    }
    cb(new Error('Hanya file Excel yang diperbolehkan'));
  }
}).single('file');

const handleExcelUpload = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Silakan pilih file Excel' });
  }

  try {

    const data: any = await productServices.upload(req.file.path);

    if (data.success) {
      // Hapus file yang di-upload setelah selesai
      fs.unlinkSync(req.file.path);

      // Kirim respons berhasil
      return res.status(200).json(responseJson("success", data.data, "File uploaded successfully"));
    }
  } catch (error) {
    return res.status(400).json(responseJson("error", error, "File upload failed"));
  }
};

const productController = {
  async getAllProduct(req: Request, res: Response) {
    try {
      const product = await productServices.getAllProduct();
      return res.status(200).json(responseJson("success", product, "get all product successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all product failed"))
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const id = generateUniqueId()
      const { name, value, brandId } = req.body

      const product = await productServices.createProduct({ id: id, name, value, brandId })
      return res.status(200).json(responseJson("success", product, "create product successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error creating product"));
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, value, brandId } = req.body

      const product = await productServices.updateProduct(req.params.id, { name, value, brandId, updated_at: new Date() });
      return res.status(200).json(responseJson("success", product, "updated product successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error updating product"));
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const product = await productServices.deleteProduct(req.params.id);
      return res.status(200).json(responseJson("success", product, "deleted product successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error deleting product"));
    }
  },

  async fileUpload(req: Request, res: Response) {
    try {
      upload(req, res, (err: any) => {
        if (err) {
          return res.status(400).json(responseJson("error", err, "error uploading"));
        }
        handleExcelUpload(req, res)
      });
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error uploading"));
    }
  }
}

export default productController;