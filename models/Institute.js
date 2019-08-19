const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstituteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  status: {
    type: String,
    default: "active"
  }
});

module.exports = Institute = mongoose.model("institutes", InstituteSchema);