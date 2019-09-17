const express = require("express");
const router = express.Router();

const Branch = require("../../models/Branch");

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

module.exports = router;
