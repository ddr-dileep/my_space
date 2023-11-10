const success = (res, data, statusCode = 200) =>
  res.status(statusCode).json({ success: true, data: data });

const error = (res, err, statusCode = 400) =>
  res.status(statusCode).json({
    success: false,
    error: err,
  });

  const serverError = (res) =>
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });

const handleDuplicateKeyError = (res, err, field) => {
  if (err?.code === 11000) {
    error(res, `${field} is already in use.`, 400);
  } else {
    serverError(res);
  }
};

module.exports = { success, error, serverError, handleDuplicateKeyError };
