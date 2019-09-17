const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
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
  phone_number: {
    type: Number,
    required: true
  },
  pan: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  staff_type: {
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
  }
});

module.exports = Teacher = mongoose.model("teachers", TeacherSchema);
