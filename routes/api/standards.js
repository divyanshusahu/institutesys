const express = require("express");
const router = express.Router();

const validateStandardInputs = require("../../validation/standard");

const Standard = require("../../models/Standard");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateStandardInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Standard.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, name: "Standard already exist" });
    }

    const newStandard = new Standard({
      name: req.body.name,
      description: req.body.description
    });

    newStandard
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Standard created successfully" })
      )
      .catch(err => res.status(500).json({ status: false, error: err }));
  });
});

router.get("/list", (req, res) => {
  Standard.find({}).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          description: user.description,
          name: user.name
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Standard List" });
    }
    return res.status(400).json({ success: false });
  });
});

module.exports = router;
