const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();

router.post('/orderData', async (req, res) => {
    try {
        const { order_data, email, order_date } = req.body;

        // Add order date at the beginning of the order data
        const orderWithDate = [{ Order_date: order_date }, ...order_data];
        
        console.log("Incoming Order:", JSON.stringify(orderWithDate, null, 2));
        await Order.findOneAndUpdate(
            { email: email },
            { $push: { order_data: orderWithDate } },
            { upsert: true, new: true } // ⚡ ensures create or update
        );


        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("Order submission error:", error.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
