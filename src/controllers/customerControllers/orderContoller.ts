import orderServices from "../../services/customerServices/orderServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";

const orderController = {
  async getBrand(req: Request, res: Response) {
    try {
      const brand = await orderServices.getBrand();
      return res.status(200).json(responseJson("success", brand, "get all brand successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get brand failed"))
    }
  },

  async getProduct(req: Request, res: Response) {
    try {
      const product = await orderServices.getProduct(req.params.id);
      return res.status(200).json(responseJson("success", product, "get all products successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get all products failed"))
    }
  },

  async addCart(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataToko = token ? getUserIdFromToken(token) : null;
      // const cart = await orderServices.addCart(req.body, dataToko.user_id);
      return res.status(200).json(responseJson("success", dataToko.user_id, "add cart successfully"))
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "add cart failed"))
    }
  }
}

export default orderController