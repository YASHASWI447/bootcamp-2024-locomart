import { Request, Response } from 'express';
import { connectDB } from '../config/db';

// Add a product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
    const { productname, stock, price, image, vendorId } = req.body;

    if (!productname || !stock || !price || !image || !vendorId) {
        res.status(400).json({ error: 'Please provide all fields' });
        return;
    }

    try {
        const db = await connectDB();
        await db.run(
            'INSERT INTO products (productName, stock, price, image, vendorId) VALUES (?, ?, ?, ?, ?)',
            [productname, stock, price, image, vendorId]
        );
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding product' });
    }
};

// Get products by vendorId
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    /* const { vendorId } = req.query;
   
     if (!vendorId) {
       res.status(400).json({ error: 'Vendor ID is required' });
       return;
     }*/

    try {
        const db = await connectDB();
        const products = await db.all('SELECT * FROM products limit 15');
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id, productname, stock, price, image, vendorId } = req.body;

    if (!id || !productname || !stock || !price || !image || !vendorId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    try {
        const db = await connectDB();
        const product = await db.get('SELECT * FROM products WHERE id = ? AND vendorId = ?', [id, vendorId]);

        if (!product) {
            res.status(404).json({ error: 'Product not found or does not belong to this vendor' });
            return;
        }

        await db.run(
            'UPDATE products SET productName = ?, stock = ?, price = ?, image = ? WHERE id = ? AND vendorId = ?',
            [productname, stock, price, image, id, vendorId]
        );
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating product' });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id, vendorId } = req.query;

    if (!id || !vendorId) {
        res.status(400).json({ error: 'Product ID and Vendor ID are required' });
        return;
    }

    try {
        const db = await connectDB();
        const product = await db.get('SELECT * FROM products WHERE id = ? AND vendorId = ?', [id, vendorId]);

        if (!product) {
            res.status(404).json({ error: 'Product not found or does not belong to this vendor' });
            return;
        }

        await db.run('DELETE FROM products WHERE id = ? AND vendorId = ?', [id, vendorId]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting product' });
    }
};
