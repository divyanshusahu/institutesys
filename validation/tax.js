const Validator = require("validator");
const isEmpty = require("is-empty");

function validateTaxInputs(data) {
  let errors = {};
  data.country_name = !isEmpty(data.country_name) ? data.country_name : "";
  data.country_code = !isEmpty(data.country_code) ? data.country_code : "";
  data.currency_code = !isEmpty(data.currency_code) ? data.currency_code : "";
  data.tax_percentage = !isEmpty(data.tax_percentage) ? data.tax_percentage : "";

  if (Validator.isEmpty(data.country_name)) {
    errors.create_tax_country_name = "Country Name field is required";
  }

  if (Validator.isEmpty(data.country_code)) {
    errors.create_tax_country_code = "Country Code field is required";
  }

  if (Validator.isEmpty(data.currency_code)) {
    errors.create_tax_currency_code = "Currency Code field is required";
  }

  if (Validator.isEmpty(data.tax_percentage)) {
    errors.create_tax_percentage = "Tax Percentage field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateTaxInputs;
