const express = require("express");
const router = express.Router();

const validateTaxInputs = require("../../validation/tax");

const Tax = require("../../models/Tax");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateTaxInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Tax.findOne({ country_name: req.body.country_name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Tax already exist" });
    }

    const newTax = new Tax({
      country_name: req.body.country_name,
      country_code: req.body.country_code,
      currency_code: req.body.currency_code,
      tax_percentage: req.body.tax_percentage
    });

    newTax
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Tax created successfully" })
      )
      .catch(err => res.status(500).json({ status: false, error: err }));
  });
});

router.get("/list", (req, res) => {
  Tax.find({}).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          country_name: user.country_name,
          country_code: user.country_code,
          currency_code: user.currency_code,
          tax_percentage: user.tax_percentage
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Tax List" });
    }
    return res.status(400).json({ success: false });
  });
});

router.post("/delete", (req, res) => {
  Tax.deleteOne({ country_name: req.body.country_name }, function(err) {
    if (err) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true });
  });
});

router.post("/update", (req, res) => {
  Tax.findOneAndUpdate(
    { country_name: req.body.country_name },
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
