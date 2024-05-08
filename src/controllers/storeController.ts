import generateUniqueId from "../utils/generateId";
import storeServices from "../services/storeServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson";
import { Request, Response } from "express";

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
      const store = await storeServices.createStore({ id: id, name, lat, long, kode, password, top, addressId, full_address });
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


      const { name, lat, long, kode, password, top, addressId, full_address } = req.body;
      const store = await storeServices.updateStore(req.params.id, { name, lat, long, kode, password, top, addressId, full_address });
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