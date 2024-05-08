import generateUniqueId from "../utils/generateId";
import addressServices from '../services/addressServices';
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson";
import { Request, Response } from "express";

const addressController = {
  async getAllAddress(req: Request, res: Response) {
    try {
      const address = await addressServices.getAllAddress()
      return res.status(200).json(responseJson("success", address, "get all address successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all address failed"));
    }
  },

  async createAddress(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = generateUniqueId()

      const { name, tr_id, multi_id } = req.body
      const address = await addressServices.createAddress({ id: id, name, tr_id, multi_id })
      return res.status(200).json(responseJson("success", address, "create address successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "create address failed"))
    }
  },

  async updateAddress(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, tr_id, multi_id } = req.body
      const address = await addressServices.updateAddress(req.params.id, { name, tr_id, multi_id })
      return res.status(200).json(responseJson("success", address, "update address successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "update address failed"))
    }
  },

  async deleteAddress(req: Request, res: Response) {
    try {
      const address = await addressServices.deleteAddress(req.params.id)
      return res.status(200).json(responseJson("success", address, "delete address successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "delete address failed"))
    }
  }

}

export default addressController;