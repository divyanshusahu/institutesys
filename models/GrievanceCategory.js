const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrievanceCategorySchema = new Schema({
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

module.exports = GrievanceCategory = mongoose.model(
  "grievance_categories",
  GrievanceCategorySchema
);
