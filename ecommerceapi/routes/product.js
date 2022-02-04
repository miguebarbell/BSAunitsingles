const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();
const Fuse = require("fuse.js");

// Create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    // console.log(req.body)
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        // console.log("added item")
        return res.status(200).json(savedProduct);

    } catch (err) {
        return res.status(500).json(err)
    }
})

// Update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            },
            {new: true}
        )
        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err)
    }
})


// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted.")
    } catch (err) {
        return res.status(500).json(err);
    }
})

// Delete All the products
router.delete("all", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.deleteMany({})
        return res.status(200).json("Database cleared.")
    } catch (err) {
        return res.status(500).json(err)
    }
})

// Get product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// Search a product
router.get("/search/:query", async (req, res) => {
    // const allProducts = await Product.find()
    // console.log(`Searching for ${req.params.query}`)
    try {
        const allProducts = await Product.find();
        // const allProducts = await Product.find();
        const options = {
            keys: [
                {
                    name: 'title',
                    weight: 0.4
                }, {
                    name: 'desc',
                    weight: 0.3
                }, {
                    name: 'sku',
                    weight: 0.3
                }]
        }
        const fuse = new Fuse(allProducts, options)
        const response = fuse.search(req.params.query.toLowerCase());
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json("error in request")
        // console.log(e)
    }
    // return res.status(500).json("Error in request.")
})

// Get all products
router.get("/", async (req, res) => {
    console.log("getting all products")
    const queryNew = req.query.new
    const queryCategory = req.query.category;
    try {
        let products;
        if (queryNew) {
            // get the most 5 new
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if (queryCategory) {
            // get by category
            products = await Product.find({
                categories: {
                    $in: [queryCategory],
                }
            })
        } else {
            // get all products
            console.log("All the products")
            products = await Product.find().sort({onHand: 1});
            products = products.map(item => {
                return {
                    'title': item.title,
                    'desc': item.desc,
                    'sku': item.sku,
                    '_id': item._id
                }
            })
        }

        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;