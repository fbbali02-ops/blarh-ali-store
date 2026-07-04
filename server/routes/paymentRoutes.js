const express = require("express");
const axios = require("axios");

const router = express.Router();

// Verify Payment
router.get("/verify/:reference", async (req, res) => {

    try {

        const reference = req.params.reference;

        console.log("PAYSTACK_SECRET_KEY:", process.env.PAYSTACK_SECRET_KEY);

        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.log("Paystack Error:", error.response?.data || error.message);

        res.status(500).json({
            message: error.message,
            error: error.response?.data || null
        });

    }

});

module.exports = router;