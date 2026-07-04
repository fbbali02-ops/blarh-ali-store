const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create Order
router.post("/", async (req, res) => {

    try {

        console.log("Incoming Order:");
        console.log(req.body);

        const order = new Order(req.body);

        await order.save();

        res.status(201).json({
            message: "Order placed successfully!",
            order
        });

    } catch (error) {

        console.log("ORDER SAVE ERROR:");
        console.log(error);

        res.status(500).json({
            message: error.message,
            error
        });

    }

});

// Get All Orders
router.get("/", async (req, res) => {

    try {

        const orders = await Order.find().sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Update Order
router.put("/:id", async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json({
            message: "Order updated successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Delete Order
router.delete("/:id", async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.json({
            message: "Order deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;