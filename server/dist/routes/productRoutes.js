"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// Add a product
router.post('/add', productController_1.addProduct);
// Get products for a vendor
router.get('/', productController_1.getProducts);
// Update a product
router.put('/update', productController_1.updateProduct);
// Delete a product
router.delete('/delete', productController_1.deleteProduct);
exports.default = router;
