// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';

// Middleware to authenticate the vendor
export const authenticateVendor = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        req.vendorId = decoded.id;  // Attach vendorId to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
