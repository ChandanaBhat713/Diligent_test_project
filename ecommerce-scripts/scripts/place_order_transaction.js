// scripts/place_order_transaction.js
const pool = require("../db/pool");

/**
 * items example: [{ productId: 2, quantity: 3, price: 499.00 }, ...]
 */
async function placeOrder(customerId, items) {
  if (!items || items.length === 0) throw new Error("No items provided");

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const totalAmount = items.reduce(
      (s, it) => s + it.quantity * it.price,
      0.0
    );

    const [orderRes] = await conn.execute(
      `INSERT INTO Orders (CustomerId, OrderDate, TotalAmount) VALUES (?, NOW(), ?)`,
      [customerId, totalAmount]
    );
    const orderId = orderRes.insertId;

    const insertItemSql = `INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price) VALUES (?, ?, ?, ?)`;

    for (const it of items) {
      await conn.execute(insertItemSql, [
        orderId,
        it.productId,
        it.quantity,
        it.price,
      ]);
    }

    await conn.commit();
    return { orderId, totalAmount };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

// demo run
async function run() {
  try {
    const items = [
      { productId: 1, quantity: 2, price: 499.0 },
      { productId: 3, quantity: 1, price: 1299.0 },
    ];
    const res = await placeOrder(1, items); // ensure customer id 1 exists
    console.log("Order placed:", res);
  } catch (err) {
    console.error("Failed to place order:", err.message);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) run();
module.exports = { placeOrder };
