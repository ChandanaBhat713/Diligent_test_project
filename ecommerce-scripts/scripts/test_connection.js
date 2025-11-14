const pool = require("../db/pool");

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to MySQL successfully!");
    const [rows] = await conn.query("SELECT 1 + 1 AS result");
    console.log("Query result:", rows);
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
}

testConnection();
