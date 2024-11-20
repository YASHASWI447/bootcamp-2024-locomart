"use strict";
// import sqlite3 from 'sqlite3';
// import { open, Database } from 'sqlite';
// import path from 'path';
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
exports.connectDB = void 0;
// // Create a function to connect to the database
// export const connectDB = async (): Promise<Database> => {
//   const db = await open({
//     filename: path.join(__dirname, '../..', 'database.sqlite'),
//     driver: sqlite3.Database
//   });
//   return db;
// };
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
// Create a function to connect to the database
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, sqlite_1.open)({
        filename: path_1.default.join(__dirname, '../..', 'database.sqlite'),
        driver: sqlite3_1.default.Database,
    });
    // Initialize tables if they don't exist
    yield db.exec(`
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
});
exports.connectDB = connectDB;
