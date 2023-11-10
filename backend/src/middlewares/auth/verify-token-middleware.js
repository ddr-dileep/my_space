const JWT = require("jsonwebtoken");
const apiResponse = require("../../api");

const verifyUserTokenMiddleware = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      JWT.verify(token, process.env.APPLICATION_SECRET, (err, decoded) => {
        if (err) return apiResponse.error(res, "Invalid token", 401);
        req.user = decoded;
        next();
      });
    } else {
      return apiResponse.error(res, "Authentication failed", 404);
    }
  } catch (err) {
    return apiResponse.serverError(res);
  }
};

module.exports = verifyUserTokenMiddleware;
