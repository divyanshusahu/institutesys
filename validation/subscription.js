const Validator = require("validator");
const isEmpty = require("is-empty");

function validateSubscriptionInputs(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price_per_user_per_month = !isEmpty(data.price_per_user_per_month)
    ? data.price_per_user_per_month
    : "";
  data.price_per_user_per_year = !isEmpty(data.price_per_user_per_year)
    ? data.price_per_user_per_year
    : "";
  data.number_of_free_days = !isEmpty(data.number_of_free_days)
    ? data.number_of_free_days
    : "";
  data.number_of_free_users = !isEmpty(data.number_of_free_users)
    ? data.number_of_free_users
    : "";
  //data.features = !isEmpty(data.features) ? data.features : [];

  if (Validator.isEmpty(data.name)) {
    errors.create_subscription_name = "Name field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.create_subscription_description = "Description field is required";
  }

  if (Validator.isEmpty(data.price_per_user_per_month)) {
    errors.create_subscription_price_per_user_per_month = "Price per user per month field is required";
  }

  if (Validator.isEmpty(data.price_per_user_per_year)) {
    errors.create_subscription_price_per_user_per_year = "Price per user per year field is required";
  }

  if (Validator.isEmpty(data.number_of_free_days)) {
    errors.create_subscription_number_of_free_days = "Number of free days field is required";
  }

  if (Validator.isEmpty(data.number_of_free_users)) {
    errors.create_subscription_number_of_free_users = "Number of free users field is required";
  }

  /*if (Validator.isEmpty(data.features)) {
    errors.create_subscription_features = "Features field is required";
  }*/

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateSubscriptionInputs;
