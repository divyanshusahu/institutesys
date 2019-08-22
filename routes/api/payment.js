const paypal = require("paypal-rest-sdk");
const express = require("express");
const router = express.Router();

paypal.configure({
  mode: "sandbox", // or live
  client_id:
    "Aa-s2kBJv0irVIXvM09YGYHacolGoUZqi74OicNzNesyowcXR8PNMlGB6eM1izGFfTRvUEiZL74pWf0c",
  client_secret:
    "EK0KzjnzYY68IgWVVgTaxHOG8mKH53gdctbMimWPyeDYUCfLkMfIE42qdKSWDkNgzo10amjhyJ_T5YaP"
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
              name: "Subscription",
              sku: "Subscription",
              price: "100.00",
              currency: "INR",
              quantity: 1
            }
          ]
        },
        amount: {
          currency: "INR",
          total: "100.00"
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
          //res.redirect(payment.links[i].href);
          return res
            .status(200)
            .json({ success: true, redirect_url: payment.links[i].href });
        }
      }
    }
  });
});

router.get("/success", (req, res) => {
  res.status(200).json({ success: true, message: "Buy successful" });
});

router.get("/cancel", (req, res) => {
  res
    .status(200)
    .json({ success: false, message: "Transaction cancelled by the user" });
});

module.exports = router;
