import express, { Router } from "express";
import authController from "../../controllers/customerControllers/authCustomerController";
import { authValidator } from "../../validators/customerValidator/authValidator";

const router: Router = express.Router();

router.post("/login", authValidator, authController.login);
// router.post("/logout", authValidator, authController.logout);
router.get("/verify-token", authController.verifyToken);

export default router;
