import express, { Router } from "express";
import userController from "../controllers/userController";
import { userValidator } from "../validators/userValidator";
import { userEditValidator } from "../validators/userEditValidator";
import { authenticateToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";

const router: Router = express.Router();

router.get("/", [authenticateToken, checkRole], userController.getAllusers);
router.post("/", [authenticateToken, checkRole], userValidator, userController.createUser)
router.put("/:id", [authenticateToken, checkRole], userController.updateUser)
router.delete("/:id", [authenticateToken, checkRole], userController.deleteUser)

export default router;
