const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
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

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// GET ALL PRODUCTS
app.get("/products", (req, res) => {

  db.query("SELECT * FROM products", (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});

// GET SINGLE PRODUCT
app.get("/products/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.json(result[0]);

    }
  );

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});