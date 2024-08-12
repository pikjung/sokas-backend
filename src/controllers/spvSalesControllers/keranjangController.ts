import keranjangServices from "../../services/salesServices/keranjangServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";
import { validationResult } from "express-validator";

const keranjangController = {
  async getKeranjang(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataToko = token ? getUserIdFromToken(token) : null;
      const keranjang = await keranjangServices.getKeranjang(dataToko?.user_id);
      return res
        .status(200)
        .json(responseJson("success", keranjang, "get all cart successfully"));
    } catch (error) {
      return res.status(500)
        .json(responseJson("error", error, "get all cart failed"))
    }
  },

  async deleteKeranjang(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataToko = token ? getUserIdFromToken(token) : null;
      const id = req.params.id;
      const keranjang = await keranjangServices.deleteKeranjang(dataToko?.user_id, id);
      return res.status(200).json(responseJson("success", keranjang, "delete keranjang successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "delete keranjang failed"));
    }
  },

  async updateKeranjang(req: Request, res: Response) {
    try {
      const { cartId, qty } = req.body
      const keranjang = await keranjangServices.updateKeranjang(cartId, qty);
      return res.status(200).json(responseJson("success", keranjang, "update keranjang successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "update keranjang failed"));
    }
  },

  async updateDiscount(req: Request, res: Response) {
    try {
      const { cartId, discount } = req.body
      const keranjang = await keranjangServices.updateDiscount(cartId, discount);
      return res.status(200).json(responseJson("success", keranjang, "update keranjang successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "update keranjang failed"));
    }
  },

  async addTransactions(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataToko = token ? getUserIdFromToken(token) : null;
      const keranjang = await keranjangServices.addTransactions(dataToko?.user_id, req.body)
      return res.status(200).json(responseJson("success", keranjang, "add Transaction successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "add Transaction failed"));
    }
  }
}

export default keranjangController