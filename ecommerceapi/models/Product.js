const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    sku: {type: String},
    // color: {type: String},
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true},
    onHand: {type: Number, default: 1, required:true}


}, {timestamp: true});

module.exports = mongoose.model("Product", ProductSchema)