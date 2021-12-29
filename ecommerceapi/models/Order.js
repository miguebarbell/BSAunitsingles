const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_Id: {type: String},
    userId: {type: String},
    products: [
        {
            id: {type: String, required:true},
            name: {type: String, required:true},
            quantity: {type: Number, default: 1},
            price: {type: Number},
            subtotal: {type: Number}
        }
    ],
    amount: {type: Number, required:true},
    address: {type: Object, required:true},
    card: {type: Object, required:true},
    operationId: {type: String, unique: true, required:true},
    status: {type: String, default:"pending"},
}, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema)
