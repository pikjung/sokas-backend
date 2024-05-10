import generateUniqueId from "../utils/generateId";
import storeServices from "../services/storeServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson";
import { Request, Response } from "express";
import bcrypt from "bcrypt"

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

      const { name, lat, long, kode, password, top, addressId, full_address } = req.body;
      const topInt = top.parseInt();
      const hashedPassword = await bcrypt.hash(password, 10)
      const store = await storeServices.createStore(
        {
          id: id,
          name: name,
          latititude: lat,
          longitude: long,
          kode: kode,
          password: hashedPassword,
          term_of_payment: topInt,
          addressId: addressId,
          full_address: full_address
        }
      );
      return res.status(200).json(responseJson("success", store, "create store successfully"))
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
      const { name, lat, long, kode, password, top, addressId, full_address } = req.body;
      let hashedPassword: any;
      const topInt = top.parseInt();

      if (password === null) {
        hashedPassword = specificUser?.password
      } else {
        hashedPassword = await bcrypt.hash(password, 10)
      }

      const store = await storeServices.updateStore(req.params.id, {
        name: name,
        latititude: lat,
        longitude: long,
        kode: kode,
        password: hashedPassword,
        term_of_payment: topInt,
        addressId: addressId,
        full_address: full_address,
        updated_at: new Date(),
      });
      return res.status(200).json(responseJson("success", store, "create store successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error creating store"));
    }
  },

  async deleteStore(req: Request, res: Response) {
    try {
      const store = await storeServices.deleteStore(req.params.id);
      return res.status(200).json(responseJson("success", store, "delete store successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error deleting store"));
    }
  }
}

export default storeController