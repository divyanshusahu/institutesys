const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const validateBranchInputs = require("../../validation/branch");

const Branch = require("../../models/Branch");
const User = require("../../models/User");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateBranchInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUser = new User({
    name: req.body.branch_name,
    email: req.body.email,
    username: req.body.email,
    password: req.body.password,
    role: "school",
    isVerified: true
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser
        .save()
        .catch(err => res.status(500).json({ success: false, error: err }));
    });
  });

  const newBranch = new Branch({
    institute_name: req.body.institute_name,
    branch_name: req.body.branch_name,
    email: req.body.email,
    address: req.body.address,
    phone_number: req.body.phone_number,
    standard: req.body.standard,
    institution: req.body.institution,
    timezone: req.body.timezone
  });

  newBranch
    .save()
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "Branch created successfully" })
    )
    .catch(err => res.status(500).json({ status: false, error: err }));

  let transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

  let mailinfo = {
    from: "'Institute System Admin' admin@institutesys.com",
    to: newUser.email,
    subject: "Invitation to Institute System",
    html:
      "Hey, " +
      newUser.name +
      ". Your institute added your school to Institute System.<br /><br />" +
      "Please join by below credentials:<br />" +
      "email: " +
      req.body.email +
      "<br />password: " +
      req.body.password +
      "<br />"
  };

  transporter.sendMail(mailinfo, err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  });
});

router.get("/list", (req, res) => {
  const institute_name = req.query.institute_name;
  Branch.find({ institute_name: institute_name }).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          branch_name: user.branch_name,
          email: user.email,
          address: user.address,
          phone_number: user.phone_number
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Branch List" });
    }
    return res.status(400).json({ success: false });
  });
});

router.post("/delete", (req, res) => {
  User.deleteOne({ email: req.body.email }, function(err) {
    if (err) {
      return res.status(500).json({ success: false });
    }
  });

  Branch.deleteOne({ email: req.body.email }, function(err) {
    if (err) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  });
});

router.post("/update", (req, res) => {
  Branch.findOneAndUpdate(
    { email: req.body.email },
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
