import express from 'express';
const router = express.Router();
import { createProducts, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productController.js';

router.route('/products').get(getAllProducts).post(createProducts);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getSingleProduct);

export default router;