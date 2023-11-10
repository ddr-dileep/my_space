const allRouters = require("express").Router();

allRouters.use("/auth", require("./all-routes/auth-routers"));
allRouters.use("/todo", require("./all-routes/todo-routes"));

module.exports = allRouters;
