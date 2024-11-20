import express from 'express';
import { userLogin, vendorLogin, userSignup, vendorSignup } from '../controllers/authController';

const router = express.Router();

// Define routes
router.post('/login/user', userLogin);
router.post('/login/vendor', vendorLogin);
router.post('/signup/user', userSignup);
router.post('/signup/vendor', vendorSignup);

export default router;
