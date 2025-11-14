// scripts/insert_customer.js
const pool = require("../db/pool");

async function run() {
  const conn = await pool.getConnection();
  try {
    const sql = `INSERT INTO Customers (Name, Email, Address) VALUES (?, ?, ?)`;
    const values = [
      "Chandan Bhat",
      "chandan@example.com",
      "Bengaluru, Karnataka",
    ];
    const [res] = await conn.execute(sql, values);
    console.log("Inserted Customer Id:", res.insertId);
  } finally {
    conn.release();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
