const express = require("express");
const router = express.Router();

const validateGrievanceCategoryInputs = require("../../validation/grievance_category");

const GrievanceCategory = require("../../models/GrievanceCategory");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateGrievanceCategoryInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  GrievanceCategory.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, name: "Grievance Category already exist" });
    }

    const newGrievanceCategory = new GrievanceCategory({
      name: req.body.name,
      description: req.body.description
    });

    newGrievanceCategory
      .save()
      .then(() =>
        res
          .status(200)
          .json({
            success: true,
            message: "Grievance Category created successfully"
          })
      )
      .catch(err => res.status(500).json({ status: false, error: err }));
  });
});

router.get("/list", (req, res) => {
  GrievanceCategory.find({}).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          name: user.name,
          description: user.description
        };
      });
      return res
        .status(200)
        .json({
          success: true,
          item: send_data,
          name: "Grievance Category List"
        });
    }
    return res.status(400).json({ success: false });
  });
});

router.post("/delete", (req, res) => {
  GrievanceCategory.deleteOne({ name: req.body.name }, function(err) {
    if (err) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
