import transaksiServices from "../../services/customerServices/transaksiServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";

const transaksiController = {
  async getTransaksi(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataToko = token ? getUserIdFromToken(token) : null;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      const transaksi = await transaksiServices.getTransaksi(dataToko?.user_id, startDate, endDate);
      return res.status(200)
        .json(responseJson("success", transaksi, "get all transaksi successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(responseJson("error", error, "get all transaksi failed"))
    }
  },
}

export default transaksiController;