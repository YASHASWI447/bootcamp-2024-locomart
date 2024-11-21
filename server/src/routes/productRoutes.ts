import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();

// Add a product
router.post('/add', addProduct);

// Get products for a vendor
router.get('/', getProducts);

// Update a product
router.put('/update', updateProduct);

// Delete a product
router.delete('/delete', deleteProduct);

export default router;
