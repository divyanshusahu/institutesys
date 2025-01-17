const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  institute_name: {
    type: String,
    required: true
  },
  branch_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  standard: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  academic_year: {
    type: Array
  },
  weekly_holidays: {
    type: Object
  },
  grades: {
    type: Array
  },
  subjects: {
    type: Array
  },
  divisions: {
    type: Array
  },
  slots: {
    type: Array
  },
  awards: {
    type: Array
  },
  holidays: {
    type: Array
  },
  exams: {
    type: Array
  },
  level_1: {
    type: Array
  },
  level_2: {
    type: Array
  },
  level_3: {
    type: Array
  }
});

module.exports = Branch = mongoose.model("branches", BranchSchema);
