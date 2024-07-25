import orderServices from "../../services/salesServices/orderServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";
import { validationResult } from "express-validator";
import { empty } from "@prisma/client/runtime/library";

export interface CartRequestBody {
  cartData: any[]
  storeId: string;
}

const orderController = {
  async getBrand(req: Request, res: Response) {
    try {
      const brand = await orderServices.getBrand();
      return res
        .status(200)
        .json(responseJson("success", brand, "get all brand successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(responseJson("error", error, "get brand failed"));
    }
  },

  async getProduct(req: Request, res: Response) {
    try {
      const product = await orderServices.getProduct(req.params.id);
      return res
        .status(200)
        .json(
          responseJson("success", product, "get all products successfully")
        );
    } catch (error) {
      return res
        .status(500)
        .json(responseJson("error", error, "get all products failed"));
    }
  },

  async addCart(req: Request<{}, {}, CartRequestBody>, res: Response) {
    try {
      if (!Array.isArray(req.body.cartData)) {
        return res
          .status(400)
          .json(
            responseJson(
              "error",
              null,
              "Invalid request body, expected an array of cart items"
            )
          );
      }
      if (req.body.cartData === undefined || req.body.cartData.length == 0) {
        return res
          .status(400)
          .json(
            responseJson(
              "error",
              null,
              "Array tidak boleh kosong"
            )
          );
      }
      const { cartData, storeId } = req.body
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataToko = token ? getUserIdFromToken(token) : null;
      const cart = await orderServices.addCart(cartData, storeId, dataToko?.user_id);
      return res
        .status(200)
        .json(responseJson("success", cart, "add cart successfully"));
    } catch (error) {
      console.error("Error adding cart:", error);
      return res
        .status(500)
        .json(responseJson("error", error, "add cart failed"));
    }
  },

  async getToko(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const dataSales = token ? getUserIdFromToken(token) : null;
      const toko = await orderServices.getToko(dataSales?.user_id)
      return res
        .status(200)
        .json(responseJson("success", toko, "get all toko successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(responseJson("error", error, "get brand failed"));
    }
  }
};

export default orderController;
