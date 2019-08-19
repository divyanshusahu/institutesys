const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
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

module.exports = Feature = mongoose.model("features", FeatureSchema);