const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ======================
// ADD TO CART
// ======================
router.post("/add", (req, res) => {

  const { user_id, product_id, quantity } = req.body;

  console.log("Cart Request:", req.body);

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, product_id, quantity], (err, result) => {

    if (err) {
      console.log("Cart Insert Error:", err);

      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    console.log("Insert Success:", result);

    res.json({
      success: true,
      message: "Product added to cart",
      insertId: result.insertId
    });

  });

});

// ======================
// GET CART ITEMS
// ======================
router.get("/:user_id", (req, res) => {

  const sql = `
    SELECT
      cart.id,
      cart.quantity,
      products.id AS product_id,
      products.name,
      products.price,
      products.image
    FROM cart
    JOIN products
    ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [req.params.user_id], (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);

  });

});

// ======================
// REMOVE ITEM FROM CART
// ======================
router.delete("/:id", (req, res) => {

  const sql = `
    DELETE FROM cart
    WHERE id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Item removed from cart"
    });

  });

});

module.exports = router;