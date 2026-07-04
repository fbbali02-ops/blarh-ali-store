const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/ProductRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../public")));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// ==========================
// 📊 DASHBOARD STATS ROUTE
// ==========================
app.get("/api/stats", async (req, res) => {

    try {

        const products = await Product.countDocuments();
        const orders = await Order.countDocuments();

        const allOrders = await Order.find();

        let revenue = 0;

        allOrders.forEach(order => {
            revenue += order.total;
        });

        res.json({
            products,
            orders,
            revenue,
            users: 1 // placeholder for now
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});