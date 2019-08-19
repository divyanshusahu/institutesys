const Validator = require("validator");
const isEmpty = require("is-empty");

function validateCategoryInputs(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.name)) {
    errors.create_category_name = "Name field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.create_category_description = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateCategoryInputs;
