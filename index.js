const configDotenv = require("dotenv");
const APP = require("./src/app");
configDotenv.config();
const APP_PORT = process.env.APPLICATION_PORT || 9001;

// app is configured to listen on port 9001 || 9002
APP.listen(APP_PORT, () => {
  console.log("app is running on the port", APP_PORT);
});
