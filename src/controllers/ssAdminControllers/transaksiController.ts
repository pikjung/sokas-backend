import transaksiServices from "../../services/ssAdminServices/transaksiServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";

const transaksiController = {
  async getTransaksiBySS(req: Request, res: Response) {
    try {
      const userIdFromQuery = req.query.user_id as string;
      const transaksi = await transaksiServices.getTransaksiBySS(userIdFromQuery)
      return res.status(200)
        .json(responseJson("success", transaksi, "get all transaksi by ssAdmin id"))
    } catch (error: any) {
      return res
        .status(500)
        .json(responseJson("error", error, "get all transaksi failed"))
    }
  },

  async getTransaksiPending(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const user = token ? getUserIdFromToken(token) : null;
      const transaksi = await transaksiServices.getPendingTransaksi(user?.user_id)
      return res.status(200)
        .json(responseJson("success", transaksi, "get all transaksi pending by ssAdmin id"))
    } catch (error: any) {
      return res
        .status(500)
        .json(responseJson("error", error, "get all transaksi failed"))
    }
  },

  async getSpesificTransaksi(req: Request, res: Response) {
    try {
      const transaksi = await transaksiServices.getSpesificTransaksi(req.params.id, req.params.brandId)
      return res
        .status(200)
        .json(responseJson("success", transaksi, "get spesific transaksi"))
    } catch (error: any) {
      return res.status(500)
        .json(responseJson("error", error, "get spesific transaksi failed"))
    }
  },

  async cancelTransaksi(req: Request, res: Response) {
    try {
      const { id } = req.body
      const transaksi = await transaksiServices.cancelTransaksi(id)
      return res
        .status(200)
        .json(responseJson("success", transaksi, "cancel transaksi successfully"))
    } catch (error: any) {
      return res.status(500)
        .json(responseJson("error", error, "cancel transaksi failed"))
    }
  },

  async confirmTransaksi(req: Request, res: Response) {
    try {
      const { id, data, noted } = req.body
      const transaksi = await transaksiServices.confirmTransaksi(id, data, noted)
      return res
        .status(200)
        .json(responseJson("success", transaksi, "confirm transaksi successfully"))
    } catch (error: any) {
      return res
        .status(500)
        .json(responseJson("error", error, "confirm transaksi failed"))
    }
  },

  async pendingTransaksi(req: Request, res: Response) {
    try {
      const { id, pendingNote } = req.body
      const pending = await transaksiServices.pendingTransaksi(id, pendingNote);
      return res
        .status(200)
        .json(responseJson("success", pending, "transaksi di pending"))
    } catch (error: any) {
      return res
        .status(500)
        .json(responseJson("error", error, "pending transaksi failed"))
    }
  },

  async getAllSSUsers(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || null;
      const user = token ? getUserIdFromToken(token) : null;
      const ssUsers = await transaksiServices.getAllSSUsers(user?.user_id);
      return res
        .status(200)
        .json(responseJson("success", ssUsers, "get all ss users successfully"))
    } catch (error: any) {
      return res
        .status(500)
        .json(responseJson("error", error, "get all ss users failed"))
    }
  }

  // async addTransaksiBySS(req: Request, res: Response) {
  //   try {
  //     const 
  //   } catch (error: any) {

  //   }
  // }
}

export default transaksiController