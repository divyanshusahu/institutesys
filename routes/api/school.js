const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const Branch = require("../../models/Branch");
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
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

router.post("/allot_student", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    var divisions = branch.divisions;
    for (let i = 0; i < divisions.length; i++) {
      if (
        divisions[i].name === req.body.division &&
        divisions[i].grade === req.body.grade
      ) {
        divisions[i].student.push(req.body.student);
        break;
      }
    }
    Branch.findOneAndUpdate(
      { email: req.body.email },
      { $set: { divisions: divisions } },
      { upsert: false, useFindAndModify: false }
    );
  });
  Student.findOneAndUpdate(
    { email: req.body.student },
    { $set: { division: req.body.division } },
    { upsert: false, useFindAndModify: false }
  )
    .then(() =>
      res.status(200).json({ success: true, message: "Student allotted" })
    )
    .catch(() =>
      res.status(500).json({ success: false, message: "Error occurred" })
    );
});

router.get("/list_students", (req, res) => {
  Student.find({ branch_ref: req.query.email }).then(student => {
    var send_data = student.map(s => ({
      name: s.name,
      email: s.email,
      grade: s.grade,
      division: s.division
    }));
    res.status(200).json({ success: true, students: send_data });
  });
});

router.post("/create_division", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        name: req.body.name,
        grade: req.body.grade
      };
      var original_data = branch.divisions;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { divisions: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Division Successfully Added" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      res.status(400).json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_divisions", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res
        .status(200)
        .json({ success: true, divisions: branch.divisions });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_slot", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        period: req.body.period,
        type: req.body.type,
        start_time: req.body.start_time,
        end_time: req.body.end_time
      };
      var original_data = branch.slots;
      for (let i = 0; i < original_data.length; i++) {
        if (original_data[i].period === req.body.period) {
          return res
            .status(400)
            .json({ success: false, message: "Period alrealy exists" });
        }
      }
      original_data.splice(req.body.period - 1, 0, save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { slots: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Slot successfully added" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      res.status(400).json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_slots", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res.status(200).json({ success: true, slots: branch.slots });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/add_division_timetable", (req, res) => {
  Branch.findOne({ email: req.body.email }),
    then(branch => {
      var divisions = branch.divisions;

      for (let i = 0; i < divisions.length; i++) {
        if (
          divisions[i].grade === req.body.grade &&
          divisions[i].name === req.body.name
        ) {
          divisions[i] = {
            grade: req.body.grade,
            name: req.body.division,
            students: [],
            timetable: req.body.data
          };
          break;
        }
      }
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { divisions: divisions } },
        { upsert: false, useFindAndModify: false }
      );
      return res.status(200).json({ success: true, message: "Updated" });
    });
});

router.post("/create_teacher", (req, res) => {
  Teacher.findOne({ email: req.body.email }).then(teacher => {
    if (teacher) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher already added" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.email,
      password: req.body.password,
      role: "teacher",
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

    const newTeacher = new Teacher({
      branch_ref: req.body.branch_email,
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      pan: req.body.pan,
      qualification: req.body.qualification,
      designation: req.body.designation,
      staff_type: req.body.staff_type,
      joining_date: req.body.joining_date,
      date_of_birth: req.body.date_of_birth
    });
    newTeacher
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Teacher successfully added" })
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

router.post("/add_skills", (req, res) => {
  Teacher.findOne({ email: req.body.teacher_email }).then(teacher => {
    if (teacher) {
      var save_obj = {
        grade: req.body.grade,
        division: req.body.division,
        subject_name: req.body.subject_name
      };
      var original_data = teacher.skills;
      if (original_data.indexOf(save_obj) >= 0) {
        return res
          .status(400)
          .json({ success: false, message: "Skill already added" });
      } else {
        original_data.push(save_obj);
        Teacher.findOneAndUpdate(
          { email: req.body.teacher_email },
          { $set: { skills: original_data } },
          { upsert: false, useFindAndModify: false }
        )
          .then(() =>
            res
              .status(200)
              .json({ success: true, message: "Skill successfully added" })
          )
          .catch(err => res.status(500).json({ success: false, message: err }));
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.post("/add_time_slot", (req, res) => {
  Teacher.findOne({ email: req.body.teacher_email }).then(teacher => {
    if (teacher) {
      var newData = {
        period: req.body.period,
        slot: req.body.slot,
        Monday: req.body.Monday,
        Tuesday: req.body.Tuesday,
        Wednesday: req.body.Wednesday,
        Thursday: req.body.Thursday,
        Friday: req.body.Friday,
        Saturday: req.body.Saturday,
        Sunday: req.body.Sunday,
        assigned: []
      };
      var original_data = teacher.available_time_slots;
      for (let i = 0; i < original_data.length; i++) {
        if (original_data[i].period === req.body.period) {
          original_data.splice(i, 1);
        }
      }
      original_data.push(newData);
      Teacher.findOneAndUpdate(
        { email: req.body.teacher_email },
        { $set: { available_time_slots: original_data } },
        { upsert: false, useFindAndModify: false }
      ).then(() => res.status(200).json({ success: true, message: "Updated" }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_teacher_available_slots", (req, res) => {
  Teacher.findOne({ email: req.query.email }).then(teacher => {
    if (teacher) {
      return res
        .status(200)
        .json({ success: true, data: teacher.available_time_slots });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.get("/list_teachers", (req, res) => {
  Teacher.find({ branch_ref: req.query.email }).then(teacher => {
    var send_data = teacher.map(s => ({
      name: s.name,
      email: s.email,
      skills: s.skills,
      available_time_slots: s.available_time_slots
    }));
    res.status(200).json({ success: true, teachers: send_data });
  });
});

router.post("/create_holiday", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        year: req.body.year,
        date: req.body.date,
        description: req.body.description
      };
      var original_data = branch.holidays;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { holidays: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Holiday successfully added" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_holidays", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res.status(200).json({ success: true, holidays: branch.holidays });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_level_one", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        name: req.body.name,
        description: req.body.description
      };
      var original_data = branch.level_1;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { level_1: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Level Successfully Added" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_level_one", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res.status(200).json({ success: true, level_one: branch.level_1 });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_level_two", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        name: req.body.name,
        description: req.body.description
      };
      var original_data = branch.level_2;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { level_2: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Level Successfully Added" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_level_two", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res.status(200).json({ success: true, level_two: branch.level_2 });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_level_three", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        name: req.body.name,
        description: req.body.description
      };
      var original_data = branch.level_3;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { level_3: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Level Successfully Added" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_level_three", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      return res
        .status(200)
        .json({ success: true, level_three: branch.level_3 });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.post("/create_exam", (req, res) => {
  Branch.findOne({ email: req.body.email }).then(branch => {
    if (branch) {
      var save_obj = {
        year: req.body.year,
        name: req.body.name,
        grade: req.body.grade,
        description: req.body.description,
        marks_entry_date: req.body.marks_entry_date,
        parents_approval_date: req.body.parents_approval_date,
        exam_prepare_date: req.body.exam_prepare_date
      };
      var original_data = branch.exams;
      original_data.push(save_obj);
      Branch.findOneAndUpdate(
        { email: req.body.email },
        { $set: { exams: original_data } },
        { upsert: false, useFindAndModify: false }
      )
        .then(() =>
          res
            .status(200)
            .json({ success: true, message: "Exam Successfully Created" })
        )
        .catch(err => res.status(500).json({ success: false, message: err }));
    } else {
      return res
        .status(400)
        .json({ success: false, message: "An error occurred" });
    }
  });
});

router.get("/list_exams", (req, res) => {
  Branch.findOne({ email: req.query.email }).then(branch => {
    if (branch) {
      var send_data = branch.exams.map(e => ({
        grade: e.grade,
        name: e.name,
        description: e.description
      }));
      res.status(200).json({ success: true, exams: send_data });
    } else {
      res.status(400).json({ success: false });
    }
  });
});

module.exports = router;
