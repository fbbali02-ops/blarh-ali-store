const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/upload");

const router = express.Router();

// Add Product with Image Upload
router.post("/add", upload.single("image"), async (req, res) => {

    try {

        const product = new Product({

            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            image: "uploads/" + req.file.filename

        });

        await product.save();

        res.status(201).json({

            message: "Product added successfully",
            product

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
// Delete Product
router.delete("/:id", async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

// Update Product
router.put("/:id", async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
module.exports = router;