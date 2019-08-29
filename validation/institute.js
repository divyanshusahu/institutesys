const Validator = require("validator");
const isEmpty = require("is-empty");
const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

function validateInstituteInputs(data, ip) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.registration_number = !isEmpty(data.registration_number)
    ? data.registration_number
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.funding_body = !isEmpty(data.funding_body) ? data.funding_body : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";
  data.size_of_the_institute = !isEmpty(data.size_of_the_institute)
    ? data.size_of_the_institute
    : "";
  data.country_name = !isEmpty(data.country_name) ? data.country_name : "";
  data.captcha === !isEmpty(data.captcha) ? data.captcha : "";

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

  if (Validator.isEmpty(data.email)) {
    errors.create_institute_owner_email = "Owner email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.create_institute_owner_email = "Email is invalid";
  }

  if (Validator.isEmpty(data.funding_body)) {
    errors.create_institute_funding_body = "Funding Body field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.create_institute_password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.create_institute_password = "Password must be atleast 8 characters";
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.create_institute_confirm_password =
      "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.create_institute_password = "Password does not match";
  }

  if (Validator.isEmpty(data.size_of_the_institute)) {
    errors.create_institute_size_of_the_institute =
      "Size of Institute field is required";
  }

  if (Validator.isEmpty(data.country_name)) {
    errors.create_institute_country_name = "Country Name field is required";
  }

  if (
    data.captcha === undefined ||
    data.captcha === "" ||
    data.captcha === null
  ) {
    errors.create_institute_captcha = "Captcha is required";
  }

  const secretKey = process.env.CAPTCHA_SECRETKEY;
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${ip}`;
  axios.get(verifyUrl).then(res => {
    if (!res.data.success) {
      errors.create_institute_captcha = "Captcha verification failed";
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateInstituteInputs;
