const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customer: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        default: ""
    },

    products: [
        {
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],

    total: {
        type: Number,
        required: true
    },
    paymentReference: {
    type: String,
    default: ""
},

paymentStatus: {
    type: String,
    default: "Pending"
},

    status: {
        type: String,
        default: "Pending"
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Order", orderSchema);