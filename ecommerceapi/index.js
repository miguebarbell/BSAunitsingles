// console.log('hot reload');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const cors = require("cors");


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection successfully')).catch((err) => {
        console.log(err);
});


app.use(cors());
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);


// app.get("/api/tests", () => {
//     console.log('test is successful')
// })


app.listen(process.env.PORT || 5000, () => {
    console.log('Backend Server listening');
})
