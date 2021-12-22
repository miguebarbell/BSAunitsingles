const Order = require("../models/Order")
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const router = require("express").Router()

// Create

router.post("/", async (req, res) => {
    const billingAddress = req.body.billingAddress;
    console.log(req.body)
    const newOrder = new Order({
        user_Id: req.body.user.currentUser._id,
        userId: req.body.user.currentUser.username,
        products: req.body.products.map(product => ({...product, quantity: parseInt(product.quantity)})),
        amount: req.body.total_amount,
        operationId: billingAddress.id.toString(), //must be unique
        card: {
            last4: `**** **** **** ${billingAddress.last4}`,
            name: billingAddress.name,
            exp_month: billingAddress.exp_month,
            exp_year: billingAddress.exp_year,
        },
        address: {
            city: billingAddress.address_city,
            country: billingAddress.address_country,
            street1: billingAddress.address_line1,
            street2: billingAddress.address_line2? billingAddress.address_line2 : '',
            zipCode : billingAddress.address_zip,
            // email: billingAddress.
        },
    })
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// Update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,},
            { new: true }
        )
        res.status(200).json(updatedOrder);
    } catch(err) {
        res.status(500).json(err)
    }
})


// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted.")
    } catch(err) {
        res.status(500).json(err);
    }
})

// Get user orders
router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
    // console.log('getting orders from')
    // make a filter and check if the :userid is the same as the user
    // console.log(req.params.userId)

    try {
        const orders = await Order.find({user_Id: req.params.userId});
        res.status(200).json(orders);
    } catch(err) {
        res.status(500).json(err);
    }
})

// Get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch(err) {
        res.status(500).json(err)
    }
})


// Get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previuosMonth = new Date().setMonth(lastMonth.getMonth() - 1)
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previuosMonth }}},
            { $project: {month: { $month: "$createdAt"},
                sales: "$amount",},},
            { $group: { _id:"$month",
                total:{$sum: "$sales"},},},
        ])
        res.status(200).json(income)
    } catch(err) {
        res.status(500).json(err);
    }
})


module.exports = router;
