// import sqlite3 from 'sqlite3';
// import { open, Database } from 'sqlite';
// import path from 'path';

// // Create a function to connect to the database
// export const connectDB = async (): Promise<Database> => {
//   const db = await open({
//     filename: path.join(__dirname, '../..', 'database.sqlite'),
//     driver: sqlite3.Database
//   });
//   return db;
// };
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Create a function to connect to the database
export const connectDB = async (): Promise<Database> => {
  const db = await open({
    filename: path.join(__dirname, '../..', 'database.sqlite'),
    driver: sqlite3.Database,
  });

  // Initialize tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vendorName TEXT NOT NULL,
     
      email TEXT UNIQUE NOT NULL,
       shopName TEXT NOT NULL,
       address TEXT NOT NULL,
       contactNo TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);

  console.log('Database connected and tables initialized.');
  return db;
};


