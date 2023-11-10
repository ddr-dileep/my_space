const JWT = require("json-token");

const createUserToken = async (userId) => {
  try {
    const token = await JWT.sign(
      { _id: userId },
      process.env.APPLICATION_SECRET,
      {
        expiresIn: "12d",
      }
    );
    return token;
  } catch (err) {
    next(err);
  }
};


module.exports = { createUserToken };