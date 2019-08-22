const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price_per_user_per_month: {
    type: String,
    required: true
  },
  price_per_user_per_year: {
    type: String,
    required: true
  },
  number_of_free_days: {
    type: Number,
    required: true
  },
  number_of_free_users: {
    type: Number,
    required: true
  },
  features: {
    type: Array,
    required: true
  }
});

module.exports = Subscription = mongoose.model("subscriptions", SubscriptionSchema);
