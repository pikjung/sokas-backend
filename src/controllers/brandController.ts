import generateUniqueId from "../utils/generateId";
import brandServices from "../services/brandServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson";
import { Request, Response } from 'express';

const brandController = {
  async getAllBrand(req: Request, res: Response) {
    try {
      const brand = await brandServices.getAllbrand();
      return res.status(200).json(responseJson("success", brand, "get all brand successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all brand failed"))
    }
  },

  async createBrand(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() })
      }

      const id = generateUniqueId()
      const { name, color, value, trx_organization } = req.body
      const brand = await brandServices.createBrand({ id: id, name, color, value, trx_organization })
      return res.status(200).json(responseJson("success", brand, "brand created successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error creating brand"))
    }
  },

  async updateBrand(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() })
      }

      const { name, color, value, trx_organization } = req.body
      const brand = await brandServices.updateBrand(req.params.id, { name, color, value, trx_organization, updated_at: new Date() })
      return res.status(200).json(responseJson("success", brand, "brand updated successfully"))
    } catch (error) {
      console.log(error)
      return res.status(500).json(responseJson("error", error, "error updating brand"))
    }
  },

  async deleteBrand(req: Request, res: Response) {
    try {
      const brand = await brandServices.deleteBrand(req.params.id)
      return res.status(200).json(responseJson("success", brand, "brand deleted successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error deleting brand"))
    }
  }
}

export default brandController