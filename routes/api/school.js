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

module.exports = router;
