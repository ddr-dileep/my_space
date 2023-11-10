const apiResponse = require("../../api");

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password)
    apiResponse.error(res, "Please enter email and password");
  else if (!email || email.length === 0)
    apiResponse.error(res, "Please enter email");
  else if (!password || password.length === 0)
    apiResponse.error(res, "Please enter password");
  return next();
};

module.exports = loginMiddleware;
