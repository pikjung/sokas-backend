import kulesServices from "../../services/salesServices/kulesServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";

const kulesContoller = {
  async addKules(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const sales = token ? getUserIdFromToken(token) : null;
      const { latitude, longitude, storeId, note, isnoo } = req.body
      let store;
      if (isnoo) {
        store = null;
      } else {
        store = storeId;
      }
      const kules = await kulesServices.addKules(sales?.user_id, { storeId: store, latitude: latitude, longitude: longitude, note: note, isnoo: isnoo });
      return res.status(200).json(responseJson("success", kules, "add kules successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "add kules failed"))
    }
  },

  async historyKules(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const sales = token ? getUserIdFromToken(token) : null;
      const kules = await kulesServices.historyKules(sales?.user_id)
      return res.status(200).json(responseJson("success", kules, "get history kules successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get history kules failed"))
    }
  }
}

export default kulesContoller