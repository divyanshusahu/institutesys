const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const Branch = require("../../models/Branch");
const Student = require("../../models/Student");
const User = require("../../models/User");

router.get("/current_school", (req, res) => {
  Branch.findOne({ email: req.query.branch_email }).then(branch => {
    if (branch) {
      var send_data = {
        institute_name: branch.institute_name,
        address: branch.address,
        standard: branch.standard
      };
      return res.status(200).json({ success: true, branch: send_data });
    }
    return res.status(400).json({ success: false });
  });
});

router.post("/create_academic_year", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        year_name: req.body.year_name,
        start_date: req.body.start_date,
        is_current_year: req.body.is_current_year
      };
      var original_data = branch.academic_year;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { academic_year: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Academic Year added Successfully"
          });
        })
        .catch(err => {
          return res.status(500).json({ success: false, message: err });
        });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An Error Occurred" });
    }
  });
});

router.get("/list_academic_years", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res
        .status(200)
        .json({ success: true, years: branch.academic_year });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/add_weekly_holidays", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      Branch.findOneAndUpdate(
        { email: req.query.email },
        { $set: { weekly_holidays: req.body } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() => {
          return res
            .status(200)
            .json({ success: true, message: "Updated Successfully" });
        })
        .catch(err => {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        });
    } else {
      res.status(400).json({ success: false, message: "An Error Occurred" });
    }
  });
});

router.get("/add_weekly_holidays", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res
        .status(200)
        .json({ success: true, holidays: branch.weekly_holidays });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_grade", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        grade: req.body.create_grade,
        description: req.body.description,
        max_student: req.body.max_student,
        age: req.body.age,
        start_time: req.body.start_time,
        end_time: req.body.end_time
      };
      var original_data = branch.grades;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { grades: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Grade added Successfully" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An Error Occurred" });
    }
  });
});

router.get("/list_grades", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res.status(200).json({ success: true, grades: branch.grades });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_subject", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        subject_name: req.body.subject_name,
        subject_description: req.body.subject_description,
        grade: req.body.grade
      };
      var original_data = branch.subjects;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { subjects: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Subject Successfully added" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_subjects", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res.status(200).json({ success: true, subjects: branch.subjects });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_student", (req, res) => {
  Student.findOne({ email: req.body.email }).then(student => {
    if (student) {
      return res
        .status(400)
        .json({ success: false, message: "Student already added" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.email,
      password: req.body.password,
      role: "student",
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
          .catch(err => res.status(500).json({ success: false, message: err }));
      });
    });

    const newStudent = new Student({
      branch_ref: req.body.branch_email,
      name: req.body.name,
      email: req.body.email,
      admission_no: req.body.admission_no,
      address: req.body.address,
      joining_date: req.body.joining_date,
      date_of_birth: req.body.date_of_birth,
      grade: req.body.grade,
      previous_class_performance: req.body.previous_class_performance
    });
    newStudent
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Student successfully added" })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "An error occurred", error: err })
      );

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
        ". Your school added you to Institute System.<br /><br />" +
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
});

module.exports = router;
