const express = require("express");
const router = express.Router();

// GET ALL PRODUCTS
module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
      res.json(result);
    });
  });

  return router;
};