const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL PRODUCTS

router.get("/", (req, res) => {

  const sql = `
    SELECT products.*, categories.name AS category_name
    FROM products
    JOIN categories
    ON products.category_id = categories.id
  `;

  db.query(sql, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);

  });

});

// GET SINGLE PRODUCT

router.get("/:id", (req, res) => {

  const sql = `
    SELECT products.*, categories.name AS category_name
    FROM products
    JOIN categories
    ON products.category_id = categories.id
    WHERE products.id = ?
  `;

  db.query(sql, [req.params.id], (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results[0]);

  });

});

module.exports = router;