import express, { Request, Response, Router } from "express";

// routes
import roleRoutes from "./routes/roleRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const router: Router = express.Router();

router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/", authRoutes);

export default router;
