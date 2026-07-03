const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

// DB
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

console.log("HOST:", process.env.MYSQLHOST);
console.log("PORT:", process.env.MYSQLPORT);
console.log("USER:", process.env.MYSQLUSER);
console.log("DB:", process.env.MYSQLDATABASE);
 db.connect((err) => {
  if(err)  {
    console.log("DB ERROR:",
      err.message);
    
  }else {
    console.log("DB CONNECTED");
  }
 })
// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// ✅ PRODUCTS ROUTE (IMPORTANT)
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running");
});