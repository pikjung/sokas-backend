import express, { Request, Response, Router } from "express";

//middleware
import { authenticateToken } from "./middleware/authMiddleware";

// routes
import roleRoutes from "./routes/roleRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import areaRoutes from "./routes/areaRoutes";
import masterAreaRoutes from "./routes/masterAreaRoutes";
import productRoutes from "./routes/productRoutes";
import brandRoutes from "./routes/brandRoutes";
import storeRoutes from "./routes/storeRoutes";
import addressRoutes from "./routes/addressRoutes";

const router: Router = express.Router();

// Admin
router.use("/admin/roles", roleRoutes);
router.use("/admin/users", userRoutes);
router.use("/admin/area", areaRoutes);
router.use("/admin/masterarea", masterAreaRoutes);
router.use("/admin/product", productRoutes);
router.use("/admin/brand", brandRoutes);
router.use("/admin", authRoutes);
router.use("/admin/store", storeRoutes)
router.use("/admin/address", addressRoutes);

// Client

export default router;
