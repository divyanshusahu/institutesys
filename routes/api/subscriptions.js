const express = require("express");
const router = express.Router();

const validateSubscriptionInputs = require("../../validation/subscription");

const Subscription = require("../../models/Subscription");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateSubscriptionInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Subscription.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Subscription already exist" });
    }

    const newSubscription = new Subscription({
      name: req.body.name,
      description: req.body.description,
      price_per_user_per_month: req.body.price_per_user_per_month,
      price_per_user_per_year: req.body.price_per_user_per_year,
      number_of_free_days: req.body.number_of_free_days,
      number_of_free_users: req.body.number_of_free_users,
      features: req.body.features
    });

    newSubscription
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Subscription created successfully" })
      )
      .catch(err => res.status(500).json({ success: false, error: err.response.data }));
  });
});

router.get("/list", (req, res) => {
  Subscription.find({}).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          name: user.name,
          description: user.description,
          price_per_user_per_month: user.price_per_user_per_month,
          price_per_user_per_year: user.price_per_user_per_year,
          number_of_free_days: user.number_of_free_days,
          number_of_free_users: user.number_of_free_users,
          features: user.features
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Subscription List" });
    }
    return res.status(400).json({ success: false });
  });
});

router.post("/delete", (req, res) => {
  Subscription.deleteOne({ name: req.body.name }, function(err) {
    if (err) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true });
  });
});

router.post("/update", (req, res) => {
  Subscription.findOneAndUpdate(
    { name: req.body.name },
    req.body,
    { new: true },
    function(err, doc) {
      if (err) {
        return res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
      return res
        .status(200)
        .json({ status: true, message: "Successfully Updated" });
    }
  );
});

module.exports = router;
