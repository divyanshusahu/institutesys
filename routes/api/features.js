const express = require("express");
const router = express.Router();

const validateFeatureInputs = require("../../validation/feature");

const Feature = require("../../models/Feature");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateFeatureInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Feature.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, name: "Feature already exist" });
    }

    const newFeature = new Feature({
      name: req.body.name,
      description: req.body.description
    });

    newFeature
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Feature created successfully" })
      )
      .catch(err => res.status(500).json({ status: false, error: err }));
  });
});

router.get("/list", (req, res) => {
  Feature.find({}).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          description: user.description,
          name: user.name
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Feature List" });
    }
    return res.status(400).json({ success: false });
  });
});

module.exports = router;
