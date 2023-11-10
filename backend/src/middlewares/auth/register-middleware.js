const apiResponse = require("../../api");

const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  const isStrongPassword =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
      password
    );

  const errors = {
    username: !username
      ? "Username cannot be empty"
      : username.length <= 3
      ? "Username must be at least 3 characters"
      : null,
    email: !email
      ? "Email cannot be empty"
      : !isEmailValid
      ? "Email is not valid"
      : null,
    password: !password
      ? "Password cannot be empty"
      : !isStrongPassword
      ? "Password must be strong"
      : null,
  };

  const errorValues = Object.values(errors).filter((error) => error);
  if (errorValues?.length > 0) return apiResponse.error(res, errorValues[0]);
  return next();
};

module.exports = validateRegistration;
