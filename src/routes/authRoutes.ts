import express, { Request, Response, Router } from 'express';
import { login, logout } from '../controllers/authController'

const router: Router = express.Router();

router.get('/login', login)
router.get('/logout', logout)

export default router