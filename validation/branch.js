const Validator = require("validator");
const isEmpty = require("is-empty");

function validateBranchInputs(data) {
  let errors = {};
  data.branch_name = !isEmpty(data.branch_name) ? data.branch_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  //data.password = !isEmpty(data.password) ? data.password : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.standard = !isEmpty(data.standard) ? data.standard : "";
  data.institution = !isEmpty(data.institution) ? data.institution : "";
  data.timezone = !isEmpty(data.timezone) ? data.timezone : "";

  if (Validator.isEmpty(data.branch_name)) {
    errors.create_branch_name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.create_branch_email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.create_branch_email = "Invalid Email";
  }

  /*if (Validator.isEmpty(data.password)) {
    errors.create_branch_password = "Password field is required";
  }*/

  if (Validator.isEmpty(data.address)) {
    errors.create_branch_address = "Address field is required";
  }

  if (Validator.isEmpty(data.phone_number)) {
    errors.create_branch_phone_number = "Phone Number field is required";
  }

  if (Validator.isEmpty(data.standard)) {
    errors.create_branch_standard = "Standard field is required";
  }

  if (Validator.isEmpty(data.institution)) {
    errors.create_branch_institution = "Institution field is required";
  }

  if (Validator.isEmpty(data.timezone)) {
    errors.create_branch_timezone = "Timezone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateBranchInputs;
