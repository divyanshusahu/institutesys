const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  branch_ref: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  admission_no: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  joining_date: {
    type: Date,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  previous_class_performance: {
    type: String,
    required: true
  }
});

module.exports = Student = mongoose.model("students", StudentSchema);
