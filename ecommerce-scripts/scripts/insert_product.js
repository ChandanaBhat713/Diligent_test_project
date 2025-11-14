// scripts/insert_product.js
const pool = require("../db/pool");

async function run() {
  const conn = await pool.getConnection();
  try {
    const sql = `INSERT INTO Products (Name, Description, Price, CategoryId) VALUES (?, ?, ?, ?)`;
    const values = ["Wireless Mouse", "Ergonomic wireless mouse", 799.0, 1]; // adjust category id
    const [res] = await conn.execute(sql, values);
    console.log("Inserted Product Id:", res.insertId);
  } finally {
    conn.release();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
