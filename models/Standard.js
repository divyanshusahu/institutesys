const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StandardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Standard = mongoose.model("standard", StandardSchema);
