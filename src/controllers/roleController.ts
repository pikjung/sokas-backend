import { Request, Response } from "express";
import { validationResult } from "express-validator";
import roleService from "../services/roleServices";
import responseJson from "../utils/responseJson";
import generateId from "../utils/generateId";


const roleController = {
  async getAllRole(req: Request, res: Response) {
    try {
      const role = await roleService.getAllRole()
      return res.status(200).json(responseJson("success", role, "get All role successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "error get all role"))
    }
  },

  async createRole(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { name } = req.body
      const role = await roleService.createRole({ id: generateId(), name })
      return res.status(201).json(responseJson("success", role, "role created successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "role create failed"))
    }
  },

  async updateRole(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const role = await roleService.updateRole(req.params.id, req.body)
      return res.status(200).json(responseJson("success", role, "role updated successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "role update failed"))
    }
  },

  async deleteRole(req: Request, res: Response) {
    try {
      const role = await roleService.deleteRole(req.params.id);
      return res.status(200).json(responseJson("success", role, "role deleted"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "role delete failed"))
    }
  }
}

export default roleController