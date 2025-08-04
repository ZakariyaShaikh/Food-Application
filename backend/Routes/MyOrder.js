const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();


router.post("/myOrder", async (req, res) => {
    try {
        let myOrders = await Order.findOne({ email: req.body.email }); 
        res.json({ orderData: myOrders }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports=router;