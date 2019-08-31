const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const validateInstituteInputs = require("../../validation/institute");
const validateLoginInputs = require("../../validation/login");

const Institute = require("../../models/Institute");
const Invitation = require("../../models/Invitation");
const User = require("../../models/User");

router.post("/create", (req, res) => {
  const { errors, isValid } = validateInstituteInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Institute.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Institute already exist" });
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
        res.status(200).json({
          success: true,
          message:
            "Institute created successfully. An email has been sent to the owner to join the app."
        })
      )
      .catch(err => res.status(500).json({ status: false, error: err }));

    crypto.randomBytes(48, (err, buffer) => {
      const newInvitation = new Invitation({
        _userid: newInstitute._id,
        token: buffer.toString("hex")
      });

      newInvitation.save();

      let transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });

      let mailinfo = {
        from: "'Institute System Admin' admin@institutesys.com",
        to: newInstitute.owner_email,
        subject: "Invitation to join Institute System App",
        html:
          "Hey, " +
          newInstitute.name +
          ". You are invited to join the Institute System App.<br />" +
          "Institute System is the secure institite system that teachers and students love and trust.<br />" +
          "Please join us by clicking the link:<br />" +
          "http://" +
          req.headers.host +
          "/api/institutes/invitation_register?token=" +
          newInvitation.token +
          "<br />Your Invitation will expire in 24 hours."
      };

      transporter.sendMail(mailinfo);
    });
  });
});

router.get("/invitation_register", (req, res) => {
  const token = req.query.token;
  Invitation.findOne({ token: token }).then(t => {
    var _id = t._userid;
    Institute.findOne({ _id }).then(user => {
      const send_data = {
        _id: _id,
        name: user.name,
        owner_email: user.owner_email
      };
      res.status(200).json({ success: true, institute: send_data });
    });
  });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateLoginInputs(req.body);

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
      role: req.body.role,
      isVerified: req.body.isVerified
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(() => {
            let _id = req.body._id;
            Institute.findOne({ _id }).then(user => {
              user.isActive = true;
              user.save();
            });
          })
          .catch(err => res.status(500).json({ error: err.response.data }));
      });
    });
    res
      .status(200)
      .json({ success: true, message: "Account created successfully" });
  });
});

router.get("/list", (req, res) => {
  Institute.find({}).then(user => {
    if (user) {
      var send_data = user.map(user => {
        return {
          active: user.isActive,
          name: user.name,
          phone_number: user.phone_number,
          registration_number: user.registration_number,
          owner_email: user.owner_email,
          funding_body: user.funding_body
        };
      });
      return res
        .status(200)
        .json({ success: true, item: send_data, name: "Institute List" });
    }
    return res.status(400).json({ success: false });
  });
});

router.get("/details", (req, res) => {
  Institute.findOne({ owner_email: req.query.owner_email }).then(user => {
    var result = {
      name: user.name,
      phone_number: user.phone_number,
      registration_number: user.registration_number,
      owner_email: user.owner_email,
      funding_body: user.funding_body
    };
    return res.status(200).json({ success: true, institute: result });
  });
});

router.post("/delete", (req, res) => {
  Institute.deleteOne({ name: req.body.name }, function(err) {
    if (err) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true });
  });
});

router.post("/update", (req, res) => {
  Institute.findOneAndUpdate(
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
