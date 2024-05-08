import generateUniqueId from "../utils/generateId";
import areaServices from "../services/areaServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson"
import { Request, Response } from 'express';

const areaController = {
  async getAllArea(req: Request, res: Response) {
    try {
      const area = await areaServices.getAllArea();
      return res.status(200).json(responseJson("success", area, "get all Area successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all Area failed"))
    }
  },

  async createArea(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const id = generateUniqueId()

      const { name, masterAreaId, sales_id, sales_support_id } = req.body;

      const area = await areaServices.createArea({ id: id, name, masterAreaId, sales_id, sales_support_id });
      return res.status(200).json(responseJson("success", area, "create Area successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "Create Area failed"))
    }
  },

  async updateArea(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, masterAreaId, sales_id, sales_support_id } = req.body;

      const area = await areaServices.updateArea(req.params.id, { name, masterAreaId, sales_id, sales_support_id, updated_at: new Date() })
      return res.status(200).json(responseJson("success", area, "Area updated successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "Area updated failed"))
    }
  },

  async deleteArea(req: Request, res: Response) {
    try {
      const area = await areaServices.deleteArea(req.params.id);
      return res.status(200).json(responseJson("success", area, "Area deleted successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "Area deleted failed"))
    }
  }
}

export default areaController;