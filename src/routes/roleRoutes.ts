import express, { Request, Response, Router } from 'express';
import getRoles, { createRole } from '../services/roleServices';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const role = await getRoles()
  res.json(role);
})

router.post('/', async (req: Request, res: Response) => {
  const role = await createRole(req.body)
  res.json(role);
})

export default router
