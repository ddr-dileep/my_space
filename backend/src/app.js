const express = require("express");
const morgan = require("morgan");
const allRouters = require("./routers");
const databaseConfigurations = require("./utils/database-config");
const APP = express();
const cors = require("cors");

// database configuration
databaseConfigurations();

// middlewares
APP.use(morgan());
APP.use(express.json());
APP.use(cors());

// routers
APP.use("/api", allRouters);

module.exports = APP;
