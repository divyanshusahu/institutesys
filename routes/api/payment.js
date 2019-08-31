const paypal = require("paypal-rest-sdk");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

paypal.configure({
  mode: "sandbox", // or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

router.post("/buy", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: "http://" + req.headers.host + "/api/payment/success",
      cancel_url: "http://" + req.headers.host + "/api/payment/cancel"
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: req.body.name + " Subscription",
              sku: "Subscription",
              price: req.body.price,
              currency: "USD",
              quantity: 1
            }
          ]
        },
        amount: {
          currency: "USD",
          total: req.body.price
        },
        description: "You buy a subscription for Institute System."
      }
    ]
  };
  paypal.payment.create(create_payment_json, function(error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          return res
            .status(200)
            .json({ success: true, redirect_url: payment.links[i].href });
        }
      }
    }
  });
});

router.get("/success", (req, res) => {
  res.status(200).json({ success: true, message: "Purchase Successful" });
});

router.get("/cancel", (req, res) => {
  res
    .status(200)
    .json({ success: false, message: "Transaction cancelled by the user" });
});

module.exports = router;
