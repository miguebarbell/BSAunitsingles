const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    products: [
        {
            id: {type: String, required:true},
            name: {type: String, required:true},
            quantity: {type: Number, default: 1},
        }
    ],
    amount: {type: Number, required:true},
    address: {type: Object, required:true},
    card: {type: Object, required:true},
    operationId: {type: String, unique: true, required:true},
    status: {type: String, default:"pending"}
}, {timestamp: true});

module.exports = mongoose.model("Order", OrderSchema)
