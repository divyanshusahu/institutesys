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
        .json({ success: false, message: "Feature already exist" });
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
          name: user.name,
          description: user.description
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Feature List" });
    }
    return res.status(400).json({ success: false });
  });
});

router.post("/delete", (req, res) => {
  Feature.deleteOne({ name: req.body.name }, function(err) {
    if (err) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true });
  });
});

router.post("/update", (req, res) => {
  Feature.findOneAndUpdate(
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
