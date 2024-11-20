"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Define routes
router.post('/login/user', authController_1.userLogin);
router.post('/login/vendor', authController_1.vendorLogin);
router.post('/signup/user', authController_1.userSignup);
router.post('/signup/vendor', authController_1.vendorSignup);
exports.default = router;
