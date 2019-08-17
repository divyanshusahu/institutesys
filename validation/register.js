const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInputs(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role is required";
  } else if (
    !Validator.isIn(data.role, [
      "Institute",
      "School",
      "Student",
      "Teacher",
      "Parent"
    ])
  ) {
    errors.role = "Role does not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInputs;
