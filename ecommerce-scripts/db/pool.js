// db/pool.js
require("dotenv").config(); // must be first so env vars are loaded
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "your_password",
  database: process.env.DB_NAME || "Diligent",
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
    ? Number(process.env.DB_CONNECTION_LIMIT)
    : 10,
  queueLimit: 0,
});

module.exports = pool;
