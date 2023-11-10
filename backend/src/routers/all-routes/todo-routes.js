// Import the necessary controller functions and middleware
const {
  getAllTodoController,
  createTodoController,
  getSpecificTodoController,
  deleteTodoController,
} = require("../../controllers/todo/todo-controllers");

const verifyUserTokenMiddleware = require("../../middlewares/auth/verify-token-middleware");

// Create an Express Router for managing todo routes
const todoRouter = require("express").Router();

// Route to get all todo (protected by authentication)
todoRouter.get("/all", verifyUserTokenMiddleware, getAllTodoController);

// Route to create a new todo (protected by authentication)
todoRouter.post("/create", verifyUserTokenMiddleware, createTodoController);

// Route to get a specific todo by ID (protected by authentication)
todoRouter.get("/get-one/:id", verifyUserTokenMiddleware, getSpecificTodoController);

// Route to get a specific todo by ID (protected by authentication)
todoRouter.delete(
  "/delete-one/:id",
  verifyUserTokenMiddleware,
  deleteTodoController
);

// Export the todoRouter for use in your main application
module.exports = todoRouter;
