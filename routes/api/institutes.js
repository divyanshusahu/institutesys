const express = require("express");
const router = express.Router();

const validateInstituteInputs = require("../../validation/institute");

const Institute = require("../../models/Institute");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateInstituteInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Institute.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, name: "Institute already exist" });
    }

    const newInstitute = new Institute({
      name: req.body.name,
      phone_number: req.body.phone_number,
      registration_number: req.body.registration_number,
      owner_email: req.body.owner_email,
      funding_body: req.body.funding_body
    });

    newInstitute
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Institute created successfully" })
      )
      .catch(err => res.status(500).json({ status: false, error: err }));
  });
});

router.get("/list", (req, res) => {
  Institute.find({}).then(user => {
    if (user) {
      return res.status(200).json({ success: true, item: user, name: "Institute List" });
    }
  });
});

module.exports = router;