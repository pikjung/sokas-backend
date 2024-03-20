import express, { Router } from 'express';
import { roleValidator } from '../validators/roleValidator';
import roleController from '../controllers/roleController';

const router: Router = express.Router();

router.get('/', roleController.getAllRole)
router.post('/', roleValidator, roleController.createRole)
router.put('/:id', roleValidator, roleController.updateRole)
router.delete('/:id', roleController.deleteRole)

export default router
