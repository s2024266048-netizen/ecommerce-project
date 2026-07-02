const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/place", (req, res) => {

    const {
        user_id,
        total_amount,
        customer_name,
        phone,
        city,
        address
    } = req.body;

    const sql = `
        INSERT INTO orders
        (
            user_id,
            total_amount,
            customer_name,
            phone,
            city,
            address
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            total_amount,
            customer_name,
            phone,
            city,
            address
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            // Cart empty after order
            db.query(
                "DELETE FROM cart WHERE user_id = ?",
                [user_id],
                (deleteErr) => {

                    if (deleteErr) {
                        console.log(deleteErr);
                    }

                    res.json({
                        success: true,
                        message: "Order placed successfully",
                        orderId: result.insertId
                    });

                }
            );

        }
    );

});

module.exports = router;