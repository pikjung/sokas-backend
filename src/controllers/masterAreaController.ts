import generateUniqueId from "../utils/generateId";
import masterAreaServices from "../services/masterAreaServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson";
import { Request, Response } from "express";

const masterAreaController = {
  async getAllMasterArea(req: Request, res: Response) {
    try {
      const masterArea = await masterAreaServices.getAllMasterArea()
      return res.status(200).json(responseJson("success", masterArea, "get all master area successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all master area failed"));
    }
  },

  async createMasterArea(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = generateUniqueId();

      const { name, spvId } = req.body;
      const masterArea = await masterAreaServices.createMasterArea({ id: id, name, spv_id: spvId });
      return res.status(200).json(responseJson("success", masterArea, "create Master Area successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "create Master Area failed"))
    }
  },

  async updateMasterArea(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, spvId } = req.body;

      const masterArea = await masterAreaServices.updateMasterArea(req.params.id, { name, spv_id: spvId, updated_at: new Date() })
      return res.status(200).json(responseJson("success", masterArea, "update Master Area successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "Update master area failed"))
    }
  }
  ,

  async deleteMasterArea(req: Request, res: Response) {
    try {
      const masterArea = await masterAreaServices.deleteMasterArea(req.params.id);
      return res.status(200).json(responseJson("success", masterArea, "Master Area deleted successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "Master Area Delete Failed"))
    }
  }
}

export default masterAreaController;