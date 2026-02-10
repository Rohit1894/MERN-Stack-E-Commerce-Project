import express from 'express';
const router = express.Router();
import { createProducts, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productController.js';
import { verifyUserAuth } from '../middleware/userAuth.js';


router.route('/products').get(verifyUserAuth,getAllProducts).post(createProducts);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getSingleProduct);

export default router;