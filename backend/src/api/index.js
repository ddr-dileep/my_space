const {
  success,
  error,
  serverError,
  handleDuplicateKeyError,
} = require("./api-response");

const apiResponse = { success, error, serverError, handleDuplicateKeyError };

module.exports = apiResponse;
