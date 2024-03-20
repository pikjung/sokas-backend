import express, { Router } from "express";
import userController from "../controllers/userController";
import { userValidator } from "../validators/userValidator";

const router: Router = express.Router();

router.get("/", userController.getAllusers);
router.post("/", userValidator, userController.createUser)
router.put("/:id", userValidator, userController.updateUser)
router.delete("/:id", userController.deleteUser)

export default router;
