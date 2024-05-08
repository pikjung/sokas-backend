import express, { Router } from 'express';
import { productValidator } from '../validators/productValidator';
import productController from '../controllers/productController';

import { authenticateToken } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';
import { fileUploadValidator } from '../validators/fileUploadValidator';

const router: Router = express.Router();

router.get('/', [authenticateToken, checkRole], productController.getAllProduct);
router.post('/', [authenticateToken, checkRole], productValidator, productController.createProduct)
router.put('/:id', [authenticateToken, checkRole], productValidator, productController.updateProduct)
router.delete('/:id', [authenticateToken, checkRole], productController.deleteProduct)
router.post('/upload', [authenticateToken, checkRole], fileUploadValidator, productController.fileUpload)

export default router;