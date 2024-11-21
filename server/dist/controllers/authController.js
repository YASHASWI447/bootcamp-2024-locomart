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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorLogin = exports.userLogin = exports.vendorSignup = exports.userSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';
// User signup
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const db = req.app.locals.db;
        yield db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
});
exports.userSignup = userSignup;
// Vendor signup
// export const vendorSignup = async (req: Request, res: Response) => {
//   const { vendorName, email, shopName, address, contactNo, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const db = req.app.locals.db;
//     await db.run(
//       'INSERT INTO vendors (vendorName, email, shopName, address, contactNo, password) VALUES (?, ?, ?, ?, ?, ?)',
//       [vendorName, email, shopName, address, contactNo, hashedPassword]
//     );
//     res.status(201).json({ message: 'Vendor registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error registering vendor' });
//   }
// };
const vendorSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vendorName, email, shopName, address, contactNo, password } = req.body;
        // Validate required fields
        if (!vendorName || !email || !shopName || !address || !contactNo || !password) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10); // Hash the password
        const db = req.app.locals.db; // Get the SQLite DB connection
        console.log('Inserting into vendors table:', { vendorName, email, shopName });
        yield db.run('INSERT INTO vendors (vendorName, email, shopName, address, contactNo, password) VALUES (?, ?, ?, ?, ?, ?)', [vendorName, email, shopName, address, contactNo, hashedPassword]);
        res.status(201).json({ message: 'Vendor registered successfully' });
    }
    catch (error) {
        console.error('Error during vendor registration:', error.message);
        if (error.code === 'SQLITE_CONSTRAINT') {
            res.status(400).json({ error: 'Email already registered' });
        }
        else {
            res.status(500).json({ error: 'Error registering vendor' });
        }
    }
});
exports.vendorSignup = vendorSignup;
// User login
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const db = req.app.locals.db;
        const user = yield db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in user' });
    }
});
exports.userLogin = userLogin;
// Vendor login
const vendorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const db = req.app.locals.db;
        const vendor = yield db.get('SELECT * FROM vendors WHERE email = ?', [email]);
        if (!vendor) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        ;
        const isMatch = yield bcrypt_1.default.compare(password, vendor.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: vendor.id, email: vendor.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in vendor' });
        return;
    }
});
exports.vendorLogin = vendorLogin;
