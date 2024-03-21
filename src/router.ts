import express, { Request, Response, Router } from "express";

//middleware
import { authenticateToken } from "./middleware/authMiddleware";

// routes
import roleRoutes from "./routes/roleRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const router: Router = express.Router();

// Admin
router.use("/admin/roles", roleRoutes);
router.use("/admin/users", userRoutes);
router.use("/admin", authRoutes);

// Client

export default router;
