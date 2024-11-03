import monitoringServices from "../../services/dataAnalisServices/monitoringServices";
import responseJson from "../../utils/responseJson";
import { Request, Response } from "express";
import { getUserIdFromToken } from "../../utils/getUserId";
import { validationResult } from "express-validator";

const monitoringController = {
  async getMonitoring(req: Request, res: Response) {
    try {
      const fileData = await monitoringServices.getMonitoring();
      return res.status(200).json(responseJson("success", fileData, "get file data successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get file data failed"));
    }
  },

  async uploadMonitoring(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const { name } = req.body

      const file = await monitoringServices.uploadMonitoring(name, req.file.filename, req.file.path)
      return res.status(200).json(responseJson("success", file, "monitoring upload successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "monitoring upload failed"));
    }
  },

  async deleteMonitoring(req: Request, res: Response) {
    try {
      const fileData = await monitoringServices.deleteMonitoringFile(req.params.id);
      return res.status(200).json(responseJson("success", fileData, "monitoring deleted"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "monitoring deleted"));
    }
  },

  async calculateMonitoring(req: Request, res: Response) {
    try {
      const calculateMonitoring = await monitoringServices.calculateMonitoring(req.params.id);
      return res.status(200).json(responseJson("success", calculateMonitoring, "monitoring calculated successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "monitoring calculation failed"))
    }
  },

  async getAddress(req: Request, res: Response) {
    try {
      const address = await monitoringServices.getAddress();
      return res.status(200).json(responseJson("success", address, "get address successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "get address failed"));
    }
  },

  async inputAllBp(req: Request, res: Response) {
    try {
      console.log('Request Body:', req.body);
      const { formData } = req.body;
      if (!formData || !Array.isArray(formData)) {
        return res.status(400).json(responseJson("error", null, "Invalid input: formData must be an array"));
      }
      const bp = await monitoringServices.inputAllBp(formData);
      return res.status(200).json(responseJson("success", bp, "input all bp successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "input all bp failed"))
    }
  },

  async saveMonitoring(req: Request, res: Response) {
    try {
      const monitoringJson = await monitoringServices.saveMonitoring(req.params.id);
      return res.status(200).json(responseJson("success", monitoringJson, "monitoring saved successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "monitoring saved failed"));
    }
  },

  async reporting(req: Request, res: Response) {
    try {
      const reporting = await monitoringServices.reportMonitoring(req.params.id);
      return res.status(200).json(responseJson("success", reporting, "monitoring reported successfully"));
    } catch (error) {
      return res.status(500).json(responseJson("error", error, "monitoring reported failed"))
    }
  }
}

export default monitoringController;