import express, { Request, Response, Router } from 'express';
import authController from '../controllers/authController';
import { authValidator } from '../validators/authValidator';

const router: Router = express.Router();

router.post('/login', authValidator, authController.login)
router.post('/logout', authValidator, authController.logout)

export default router 