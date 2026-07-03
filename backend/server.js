const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// DATABASE CONNECTION
// =======================
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err.message);
  } else {
    console.log("DB CONNECTED");
  }
});

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// =======================
// PRODUCTS
// =======================
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// PRODUCT DETAIL
app.get("/products/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Not found" });

      res.json(result[0]);
    }
  );
});

// =======================
// AUTH REGISTER
// =======================
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          return res.json({
            success: false,
            message: "User already exists"
          });
        }

        res.json({
          success: true,
          message: "Registered Successfully"
        });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// =======================
// AUTH LOGIN
// =======================
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.json({ message: "User not found" });
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.json({ message: "Wrong password" });
      }

      const token = jwt.sign({ id: user.id }, "secretkey");

      res.json({ token });
    }
  );
});

// =======================
// CART ADD
// =======================
app.post("/api/cart/add", (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)",
    [user_id, product_id, quantity],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Added to cart"
      });
    }
  );
});

// GET CART
app.get("/api/cart/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT cart.id, cart.quantity,
           products.name, products.price, products.image
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// DELETE CART ITEM
app.delete("/api/cart/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true });
  });
});

// =======================
// PLACE ORDER
// =======================
app.post("/api/orders/place", (req, res) => {
  const {
    user_id,
    total_amount,
    customer_name,
    phone,
    city,
    address
  } = req.body;

  db.query(
    `INSERT INTO orders
    (user_id,total_amount,customer_name,phone,city,address)
    VALUES (?,?,?,?,?,?)`,
    [user_id, total_amount, customer_name, phone, city, address],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const orderId = result.insertId;

      res.json({
        success: true,
        orderId
      });
    }
  );
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});