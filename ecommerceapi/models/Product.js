const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true, default: "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"},
    categories: {type: Array, default: ["featured"]},
    sku: {type: String},
    model: {type: Array, default: ["all"]},
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true},
    onHand: {type: Number, default: 1, required:true}


}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema)