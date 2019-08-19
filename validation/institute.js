const Validator = require("validator");
const isEmpty = require("is-empty");

function validateInstituteInputs(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.registration_number = !isEmpty(data.registration_number) ? data.registration_number : "";
  data.owner_email = !isEmpty(data.owner_email) ? data.owner_email : "";
  data.funding_body = !isEmpty(data.funding_body) ? data.funding_body : "";

  if (Validator.isEmpty(data.name)) {
    errors.create_institute_name = "Name field is required";
  }

  if (Validator.isEmpty(data.phone_number)) {
    errors.create_institute_phone_number = "Phone Number field is required";
  }

  if (Validator.isEmpty(data.registration_number)) {
    errors.create_institute_registration_number =
      "Registration Number field is required";
  }

  if (Validator.isEmpty(data.owner_email)) {
    errors.create_institute_owner_email = "Owner email field is required";
  }
  else if (!Validator.isEmail(data.owner_email)) {
    errors.create_institute_owner_email = "Email is invalid";
  }

  if (Validator.isEmpty(data.funding_body)) {
    errors.create_institute_funding_body = "Funding Body field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateInstituteInputs;
