// scripts/list_categories_and_products.js
const pool = require("../db/pool");

async function run() {
  const conn = await pool.getConnection();
  try {
    const [cats] = await conn.query(
      "SELECT Id, Name FROM Categories ORDER BY Name"
    );
    console.log("Categories:", cats);

    const [products] = await conn.query(`
      SELECT p.Id, p.Name, p.Description, p.Price, c.Name AS Category
      FROM Products p
      LEFT JOIN Categories c ON p.CategoryId = c.Id
      ORDER BY p.Id LIMIT 200
    `);
    console.log("Products:", products);
  } finally {
    conn.release();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
