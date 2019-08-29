const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//const validateRegisterInputs = require("../../validation/register");
const validateLoginInputs = require("../../validation/login");
const validateInstituteInputs = require("../../validation/institute");

const User = require("../../models/User");
const Token = require("../../models/Token");
const Institute = require("../../models/Institute");

const dotenv = require("dotenv");
dotenv.config();

router.post("/register", (req, res) => {
  //const { errors, isValid } = validateRegisterInputs(req.body);
  const { errors, isValid } = validateInstituteInputs(
    req.body,
    req.connection.remoteAddress
  );

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

    const newInstitute = new Institute({
      name: req.body.name,
      owner_email: req.body.email,
      country_name: req.body.country_name,
      phone_number: req.body.phone_number,
      registration_number: req.body.registration_number,
      funding_body: req.body.phone_number,
      size_of_the_institute: req.body.size_of_the_institute
    });

    newInstitute.save();

    res.status(200).json({
      message: "A verification email has been sent to " + newUser.email,
      success: true
    });

    crypto.randomBytes(48, (err, buffer) => {
      const newToken = new Token({
        _userid: newUser._id,
        token: buffer.toString("hex")
      });

      newToken.save().catch(err => res.status(500).json({ error: err }));

      /*let transporter = nodemailer.createTransport({
        host: "smtp.pepipost.com",
        post: 587,
        secure: false,
        auth: {
          user: process.env.PEPIPOST_USER,
          pass: process.env.PEPIPOST_PASSWORD
        }
      });*/

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
        subject: "Account Verification Token",
        html:
          "Hey, " +
          newUser.name +
          ". Thanks for joining Institute System.<br /><br />" +
          "Please verify your account by clicking the link:<br />" +
          "http://" +
          req.headers.host +
          "/confirmation?token=" +
          newToken.token +
          "<br />"
      };

      transporter.sendMail(mailinfo, err => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        /*res.status(200).json({
          message: "A verification email has been sent to " + newUser.email,
          success: true
        });*/
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(400).json({ username: "No user found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ username: "Email not verified" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        var payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        return res.status(400).json({ password: "Password is incorrect" });
      }
    });
  });
});

router.get("/confirmation", (req, res) => {
  const token = req.query.token;
  Token.findOne({ token }).then(t => {
    var _id = t._userid;
    User.findOne({ _id }).then(user => {
      if (user.isVerified) {
        return res
          .status(200)
          .json({ success: false, message: "Email already verified" });
      }

      user.isVerified = true;
      user.save().catch(err => res.json({ error: err.message }));
      return res
        .status(200)
        .json({ success: true, message: "Email successfully verified" });
    });
  });
});

module.exports = router;
