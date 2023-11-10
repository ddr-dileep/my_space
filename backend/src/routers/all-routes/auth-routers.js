const {
  registerController,
  loginController,
  userInfoController,
  deleteUserController,
} = require("../../controllers/auth/auth-controllers");
const loginMiddleware = require("../../middlewares/auth/login-middleware");
const validateRegistration = require("../../middlewares/auth/register-middleware");
const verifyUserTokenMiddleware = require("../../middlewares/auth/verify-token-middleware");

const authRouters = require("express").Router();

// method : post - path /auth/register
authRouters.post("/register", validateRegistration, registerController);

// method : post - path /auth/login
authRouters.post("/login", loginMiddleware, loginController);

// method : get - path /auth/userInfo
authRouters.get("/user-info", verifyUserTokenMiddleware, userInfoController);

// method : delete - path /auth/delete
authRouters.delete("/delete", verifyUserTokenMiddleware, deleteUserController);

module.exports = authRouters;
