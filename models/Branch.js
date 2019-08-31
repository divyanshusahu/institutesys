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
    required: true
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
  }
});

module.exports = Branch = mongoose.model("branches", BranchSchema);
