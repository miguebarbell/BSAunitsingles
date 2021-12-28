const router = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_KEY)


router.post("/payment", async(req, res) => {
  // stripe.charges.create({
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: "usd",
  // }, (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //         console.log(stripeErr)
  //         res.status(500).json(stripeErr)
  //     } else {
  //         res.status(200).json(stripeRes)
  //     }
  // })
  let {amount, id} = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: 'BSA Unit Singles',
      payment_method: id,
      confirm: true
    })
    console.log("payment", payment)
    res.status(200).json({
      message: "Payment Successful",
      success: true,
      client_secret: payment.client_secret
    })
  } catch (e) {
    console.log("error", e)
    res.status(500).json({
      message: "Payment Failed",
      success: false,
    })
  }
});

module.exports = router;
