const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin:{type: Boolean, default: false},
    address: {type: String, required: false},
    name: {type: String, required: false},
    lastName: {type: String, required: false},
    telephone:{type: String, required: false},
    email: {type: String}

}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema)


