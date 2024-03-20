import generateUniqueId from "../utils/generateId";
import bcrypt from "bcrypt"
import userServices from "../services/userServices";
import { validationResult } from "express-validator";
import responseJson from "../utils/responseJson"
import { Request, Response } from 'express';


const userController = {
  async getAllusers(req: Request, res: Response) {
    try {
      const user = await userServices.getAllusers();
      return res.status(200).json(responseJson("success", user, "get all User successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all User failed"))
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, username, email, password, roleId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10)
      const id = generateUniqueId()

      const user = await userServices.createUser({ id: id, username, name, email, password: hashedPassword, roleId })
      return res.status(200).json(responseJson("success", user, "User created successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "User created failed"))
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, username, email, password, roleId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await userServices.updateUser(req.params.id, { username, name, email, password: hashedPassword, roleId, updated_at: new Date() })
      return res.status(200).json(responseJson("success", user, "User updated successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "User updated failed"))
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await userServices.deleteUser(req.params.id);
      return res.status(200).json(responseJson("success", user, "User deleted successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "User deleted failed"))
    }
  }
}

export default userController