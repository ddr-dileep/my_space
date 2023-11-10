const bcrypt = require("bcrypt");

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, password2) =>
  bcrypt.compare(password, password2);


module.exports = { hashPassword, comparePassword }; 