const Order = require("../models/Order")
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const router = require("express").Router()

// Create

router.post("/", async (req, res) => {
    const billingAddress = req.body.billingAddress;
    const card = req.body.card;
    const user = req.body.user.currentUser;
    // console.log(req.body)
    const newOrder = new Order({
        user_Id: user._id,
        userId: user.username ? user.username : 'Not Logged',
        products: req.body.products.map(product => ({...product, quantity: parseInt(product.quantity)})),
        amount: req.body.total_amount,
        shipping: req.body.shipping,
        operationId: card.id, //must be unique
        card: {
            last4: `**** **** **** ${card.card.last4}`,
            name: billingAddress.name,
            exp_month: card.card.exp_month,
            exp_year: card.card.exp_year,
        },
        address: {
            city: billingAddress.city,
            state: billingAddress.state,
            country: billingAddress.country,
            street1: billingAddress.street,
            // street2: billingAddress.address_line2? billingAddress.address_line2 : '',
            zipCode: billingAddress.zip,
            email: billingAddress.email,
            telephone: billingAddress.telephone,
        },
    })
    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

// Update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            },
            {new: true}
        )
        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(500).json(err)
    }
})


// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order has been deleted.")
    } catch (err) {
        return res.status(500).json(err);
    }
})

// Get user orders
router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
    // console.log('getting orders from')
    // make a filter and check if the :userid is the same as the user
    // console.log(req.params.userId)

    try {
        const orders = await Order.find({user_Id: req.params.userId});
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// Get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(200).json(orders)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// Get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previuosMonth = new Date().setMonth(lastMonth.getMonth() - 1)
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previuosMonth}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"},
                },
            },
        ])
        return res.status(200).json(income)
    } catch (err) {
        return res.status(500).json(err);
    }
})

// Get Specific order
router.post("/get/:orderId", verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
        // console.log(order)
        if (req.body.username === order.userId || req.body.isAdmin) {
            return res.status(200).json(order)
        } else {
            return res.status(403).json("Not Allowed to get this order")
        }

    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;
