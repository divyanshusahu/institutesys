const Validator = require("validator");
const isEmpty = require("is-empty");

function validateFeatureInputs(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.name)) {
    errors.create_institute_name = "Name field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.create_institute_description = "Phone Number field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateFeatureInputs;
