const express = require("express");
const router = express.Router();

const validateCategoryInputs = require("../../validation/category");

const Category = require("../../models/Category");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateCategoryInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Category.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, name: "Category already exist" });
    }

    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description
    });

    newCategory
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Category created successfully" })
      )
      .catch(err => res.status(500).json({ status: false, error: err }));
  });
});

router.get("/list", (req, res) => {
  Category.find({}).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          description: user.description,
          name: user.name
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Category List" });
    }
    return res.status(400).json({ success: false });
  });
});

module.exports = router;
