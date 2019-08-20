const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaxSchema = new Schema({
  country_name: {
    type: String,
    required: true,
    unique: true
  },
  country_code: {
    type: String,
    required: true
  },
  currency_code: {
    type: String,
    required: true
  },
  tax_percentage: {
    type: String,
    required: true
  }
});

module.exports = Tax = mongoose.model("tax", TaxSchema);
