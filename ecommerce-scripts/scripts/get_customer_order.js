// scripts/get_customer_orders.js
const pool = require("../db/pool");

async function getCustomerOrders(customerId) {
  const conn = await pool.getConnection();
  try {
    const [orders] = await conn.execute(
      `SELECT Id AS OrderId, OrderDate, TotalAmount FROM Orders WHERE CustomerId = ? ORDER BY OrderDate DESC`,
      [customerId]
    );

    for (const ord of orders) {
      const [items] = await conn.execute(
        `SELECT oi.Id, oi.ProductId, p.Name AS ProductName, oi.Quantity, oi.Price
         FROM OrderItems oi
         LEFT JOIN Products p ON oi.ProductId = p.Id
         WHERE oi.OrderId = ?`,
        [ord.OrderId]
      );
      ord.items = items;
    }

    return orders;
  } finally {
    conn.release();
  }
}

async function run() {
  try {
    const orders = await getCustomerOrders(1); // change customer id
    console.log(JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) run();
module.exports = { getCustomerOrders };
