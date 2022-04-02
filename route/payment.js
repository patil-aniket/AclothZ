require("dotenv").config();
const express = require("express");
const stripe = require("stripe")("sk_test_51JY2BdSDtGDwNOCjty9O4aBPDbFD20phF61jbSwDhF6WsqnuOq09rBWy4k0OsEZmPDbTfQvY1Hm5xye4RgK2BNgK00FDb2Lft3");
const router = express.Router();

// ==== router ====
router.post("/payment", async (req, res) => {
  try {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "inr",
      description: "payment"
    };

    const response = await stripe.charges.create(body);
    return res.status(200).send({ success: response });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ message: ex.message });
  }
});

module.exports = router;
