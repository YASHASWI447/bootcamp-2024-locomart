import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';

// User signup
export const userSignup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = req.app.locals.db;
    await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

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
export const vendorSignup = async (req: Request, res: Response) => {
  try {
    const { vendorName, email, shopName, address, contactNo, password } = req.body;

    // Validate required fields
    if (!vendorName || !email || !shopName || !address || !contactNo || !password) {
       res.status(400).json({ error: 'All fields are required' });
       return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const db = req.app.locals.db; // Get the SQLite DB connection

    console.log('Inserting into vendors table:', { vendorName, email, shopName });

    await db.run(
      'INSERT INTO vendors (vendorName, email, shopName, address, contactNo, password) VALUES (?, ?, ?, ?, ?, ?)',
      [vendorName, email, shopName, address, contactNo, hashedPassword]
    );

    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (error: any) {
    console.error('Error during vendor registration:', error.message);

    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Error registering vendor' });
    }
  }
};


// User login
export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const db = req.app.locals.db;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      res.status(401).json({ error: 'Invalid credentials' });
      return;

    } 

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in user' });
  }

};

// Vendor login
export const vendorLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const db = req.app.locals.db;
    const vendor = await db.get('SELECT * FROM vendors WHERE email = ?', [email]);
    if (!vendor)
      {
        res.status(401).json({ error: 'Invalid credentials' })
        return;

      };

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch){
      res.status(401).json({ error: 'Invalid credentials' });
      return;

    } 

    const token = jwt.sign({ id: vendor.id, email: vendor.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in vendor' });
    return;
  }
 
};
