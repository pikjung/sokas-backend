import kulesServices from "../../services/spvSalesServices/kulesServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";

const kulesController = {
  async getMapData(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataToko = token ? getUserIdFromToken(token) : null;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      const kules = await kulesServices.getMapData(dataToko?.user_id, startDate, endDate);
      return res
        .status(200)
        .json(responseJson("success", kules, "get map data successfully"));
    } catch (error) {
      console.error(error);
      return res.status(500).json(responseJson("error", error, "get map data failed"));
    }
  }
}

export default kulesController;