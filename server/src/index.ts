import express from 'express';
import { Express} from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
dotenv.config();

const app: Express = express()
const PORT = process.env.PORT || 5000;


// Initialize database and start the server
(async () => {
  try {
    const db = await connectDB();
    console.log('Connected to SQLite database');

    // Make db available throughout the app
    app.locals.db = db;

    app.use(cors());
    app.use(express.json());
   

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
 

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
})();
