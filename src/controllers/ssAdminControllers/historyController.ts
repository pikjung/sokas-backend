import historyServices from "../../services/ssAdminServices/historyServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";

const historyController = {
  async getHistory(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const user = token ? getUserIdFromToken(token) : null;
      const transaksi = await historyServices.getHistory(user?.user_id)
      return res.status(200)
        .json(responseJson("success", transaksi, "get all transaksi by ssAdmin id"))
    } catch (error: any) {
      return res
        .status(500)
        .json(responseJson("error", error, "get all transaksi failed"))
    }
  },

  async getSpesificHistory(req: Request, res: Response) {
    try {
      const transaksi = await historyServices.getSpesificHistory(req.params.id)
      return res
        .status(200)
        .json(responseJson("success", transaksi, "get spesific transaksi"))
    } catch (error: any) {
      return res.status(500)
        .json(responseJson("error", error, "get spesific transaksi failed"))
    }
  },
}

export default historyController