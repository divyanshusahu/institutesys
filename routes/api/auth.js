const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const validateRegisterInputs = require("../../validation/register");

const User = require("../../models/User");
const Token = require("../../models/Token");

const dotenv = require("dotenv");
dotenv.config();

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({
        email:
          "The email address you have entered is already associated with another account"
      });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser.save().catch(err => res.status(500).json({ error: err }));
      });
    });

    crypto.randomBytes(48, (err, buffer) => {
      const newToken = new Token({
        _userid: newUser._id,
        token: buffer.toString("hex")
      });

      newToken.save().catch(err => res.status(500).json({ error: err }));

      let transporter = nodemailer.createTransport({
        host: "smtp.pepipost.com",
        post: 587,
        secure: false,
        auth: {
          user: process.env.PEPIPOST_USER,
          pass: process.env.PEPIPOST_PASSWORD
        }
      });

      let mailinfo = {
        from: "'Institute System Admin' noreply@pepisandbox.com",
        to: newUser.email,
        subject: "Account Verification Token",
        html:
          "Hey, " +
          newUser.name +
          ". Thanks for joining Institute System.<br /><br />" +
          "Please verify your account by clicking the link:<br />" +
          "http://" +
          req.header.host +
          "/confirmation/" +
          token +
          ".<br />"
      };

      transporter.sendMail(mailinfo, err => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
          message: "A verification email has been sent to " + newUser.email
        });
      });
    });
  });
});

module.exports = router;
