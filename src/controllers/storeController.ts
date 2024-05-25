import generateUniqueId from "../utils/generateId";
import storeServices from "../services/storeServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
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

    const data: any = await storeServices.upload(req.file.path);

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

const storeController = {
  async getAllStore(req: Request, res: Response) {
    try {
      const store = await storeServices.getAllStore();
      return res.status(200).json(responseJson("success", store, "get all store successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all store failed"));
    }
  },

  async createStore(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const id = generateUniqueId()

      const { name, lat, long, kode, no_telp, password, top, addressId, full_address } = req.body;
      const topInt = Number(top);
      const hashedPassword = await bcrypt.hash(password, 10)
      const storeCreate = await storeServices.createStore(
        {
          id: id,
          name: name,
          latitude: lat,
          longitude: long,
          kode: kode,
          no_telp: no_telp,
          password: hashedPassword,
          term_of_payment: topInt,
          addressId: addressId,
          full_address: full_address
        }
      );
      return res.status(200).json(responseJson("success", storeCreate, "create store successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error creating store"));
    }
  },

  async updateStore(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const specificUser = await storeServices.getSpesificStore(req.params.id)
      const { name, lat, long, kode, no_telp, password, top, addressId, full_address } = req.body;
      let hashedPassword: any;
      const topInt = Number(top);

      if (password === null) {
        hashedPassword = specificUser?.password
      } else {
        hashedPassword = await bcrypt.hash(password, 10)
      }

      const store = await storeServices.updateStore(req.params.id, {
        name: name,
        latitude: lat,
        longitude: long,
        kode: kode,
        no_telp: no_telp,
        password: hashedPassword,
        term_of_payment: topInt,
        addressId: addressId,
        full_address: full_address
      });
      return res.status(200).json(responseJson("success", store, "update store successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error updating store"));
    }
  },

  async deleteStore(req: Request, res: Response) {
    try {
      const store = await storeServices.deleteStore(req.params.id);
      return res.status(200).json(responseJson("success", store, "delete store successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error deleting store"));
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

export default storeController