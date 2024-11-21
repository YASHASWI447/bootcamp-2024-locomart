"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.addProduct = void 0;
const db_1 = require("../config/db");
// Add a product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productname, stock, price, image, vendorId } = req.body;
    if (!productname || !stock || !price || !image || !vendorId) {
        res.status(400).json({ error: 'Please provide all fields' });
        return;
    }
    try {
        const db = yield (0, db_1.connectDB)();
        yield db.run('INSERT INTO products (productName, stock, price, image, vendorId) VALUES (?, ?, ?, ?, ?)', [productname, stock, price, image, vendorId]);
        res.status(201).json({ message: 'Product added successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding product' });
    }
});
exports.addProduct = addProduct;
// Get products by vendorId
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* const { vendorId } = req.query;
   
     if (!vendorId) {
       res.status(400).json({ error: 'Vendor ID is required' });
       return;
     }*/
    try {
        const db = yield (0, db_1.connectDB)();
        const products = yield db.all('SELECT * FROM products limit 15');
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});
exports.getProducts = getProducts;
// Update a product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, productname, stock, price, image, vendorId } = req.body;
    if (!id || !productname || !stock || !price || !image || !vendorId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }
    try {
        const db = yield (0, db_1.connectDB)();
        const product = yield db.get('SELECT * FROM products WHERE id = ? AND vendorId = ?', [id, vendorId]);
        if (!product) {
            res.status(404).json({ error: 'Product not found or does not belong to this vendor' });
            return;
        }
        yield db.run('UPDATE products SET productName = ?, stock = ?, price = ?, image = ? WHERE id = ? AND vendorId = ?', [productname, stock, price, image, id, vendorId]);
        res.status(200).json({ message: 'Product updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating product' });
    }
});
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, vendorId } = req.query;
    if (!id || !vendorId) {
        res.status(400).json({ error: 'Product ID and Vendor ID are required' });
        return;
    }
    try {
        const db = yield (0, db_1.connectDB)();
        const product = yield db.get('SELECT * FROM products WHERE id = ? AND vendorId = ?', [id, vendorId]);
        if (!product) {
            res.status(404).json({ error: 'Product not found or does not belong to this vendor' });
            return;
        }
        yield db.run('DELETE FROM products WHERE id = ? AND vendorId = ?', [id, vendorId]);
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});
exports.deleteProduct = deleteProduct;
