const apiResponse = require("../../api");
const User = require("../../models/auth/user-schema");
const {
  hashPassword,
  comparePassword,
} = require("../../utils/bcrypt-password");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      password: await hashPassword(req.body?.password),
    });
    await user.save(); // save the user in the database
    return apiResponse.success(res, user, 201); // success callback response from the server
  } catch (error) {
    if (error?.code === 11000)
      return apiResponse.handleDuplicateKeyError(
        res,
        error,
        Object.keys(error?.keyValue)[0]
      );
    return apiResponse.serverError(res);
  }
};

// login controller for the user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return apiResponse.error(res, "User is not registered", 404);
    const comparePass = await comparePassword(password, user?.password);
    if (!comparePass) return apiResponse.error(res, "Invalid password", 404);
    const token = await JWT.sign(
      { _id: user._id },
      process.env.APPLICATION_SECRET,
      {
        expiresIn: "12d",
      }
    );
    return apiResponse.success(res, { token });
  } catch (err) {
    return apiResponse.serverError(res);
  }
};

// delete the user
const deleteUserController = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user?._id);
    if (!user) return apiResponse.error(res, "User not found", 404); 
    return apiResponse.success(res, "user deleted successfully", 200);
  } catch (err) {
    return apiResponse.serverError(res);
  }
};

const userInfoController = async (req, res) => {
  try {
    let user = await User.findById(req.user?._id)?.populate("todo");
    user = {
      id: user?._id,
      email: user?.email,
      username: user?.username,
      totalTodo: user?.todo?.length,
      todo: user?.todo,
    };
    return apiResponse.success(res, { user }, 200);
  } catch (err) {
    console.log(err);
    return apiResponse.serverError(res);
  }
};

module.exports = {
  registerController,
  loginController,
  userInfoController,
  deleteUserController
};
