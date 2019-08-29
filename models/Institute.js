const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstituteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  registration_number: {
    type: String,
    required: true
  },
  owner_email: {
    type: String,
    required: true
  },
  funding_body: {
    type: String,
    required: true
  },
  size_of_the_institute: {
    type: String,
    required: true
  },
  myPlan: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = Institute = mongoose.model("institutes", InstituteSchema);
