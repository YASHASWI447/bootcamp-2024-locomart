"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateVendor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';
// Middleware to authenticate the vendor
const authenticateVendor = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.vendorId = decoded.id; // Attach vendorId to the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
exports.authenticateVendor = authenticateVendor;
