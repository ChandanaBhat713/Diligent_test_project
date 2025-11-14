# E-commerce Scripts

Database management scripts for an e-commerce system with MySQL connection pooling and transaction support.

## Setup

1. Install dependencies:
   `bash
   npm install
   `

2. Configure environment variables by editing .env:
   `
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce_db
   DB_PORT=3306
   `

## Database Schema

Create these tables in your database:

`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
`

## Project Structure

`
ecommerce-scripts/
 db/
    pool.js                    # MySQL connection pool
 scripts/
    select_products.js         # Query all products
    insert_user.js             # Add new user
    update_product_stock.js    # Update inventory
    place_order_transaction.js # Create order with transaction
    seed_sample_data.js        # Seed test data
 .env                           # Environment variables
 package.json                   # Dependencies & scripts
 README.md                      # This file
`

## Scripts

### select_products.js
Display all products with their current stock levels.

`ash
npm run select-products
`

### insert_user.js
Insert a new user into the database.

`ash
npm run insert-user [name] [email] [phone]
`

Example:
`ash
npm run insert-user "Jane Doe" "jane@example.com" "555-0123"
`

### update_product_stock.js
Update product stock quantity.

`ash
npm run update-stock [productId] [quantity]
`

Example:
`ash
npm run update-stock 1 -5
`

### place_order_transaction.js
Place an order with multiple items using a database transaction. Ensures ACID compliance with automatic rollback on errors.

`ash
npm run place-order [userId]
`

### seed_sample_data.js
Populate the database with sample data for testing.

`ash
npm run seed
`

## Key Features

- **Connection Pooling**: Efficient database connection management via mysql2/promise
- **Transaction Support**: ACID compliance for complex operations like order placement
- **Error Handling**: Comprehensive error management with rollback on failures
- **CLI Arguments**: Support for command-line parameters in all scripts
- **Sample Data**: Pre-configured seed script for testing

## Requirements

- Node.js 12+
- MySQL 5.7+
- npm or yarn

## Notes

- All database operations use connection pooling via mysql2/promise
- Transactions ensure data consistency for multi-step operations
- Environment variables are loaded from .env file
- Use command-line arguments to pass data to scripts
- Connection pool has a limit of 10 concurrent connections
