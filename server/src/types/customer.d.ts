import { Request } from 'express';

// Extend the Request interface to include a 'vendorId' property
declare global {
  namespace Express {
    interface Request {
      vendorId?: number; // Or string, depending on your implementation
    }
  }
}
