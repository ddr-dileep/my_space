const apiResponse = require("../../api");
const User = require("../../models/auth/user-schema");
const Todo = require("../../models/todo/todo-schema");

const getAllTodoController = async (req, res) => {
  try {
    // Get the authenticated user's ID from the request (you need to set it during user authentication)
    const userId = req.user?._id;

    // Find all todo where the 'user' field matches the authenticated user's ID
    let todo = await Todo.find({ user: userId });

    return apiResponse.success(res, {
      totalTodo: todo.length,
      todo: todo,
    });
  } catch (error) {
    return apiResponse.serverError(res);
  }
};

// Create a new todo for the authenticated user
const createTodoController = async (req, res) => {
  try {
    // Retrieve the authenticated user's ID from the request (you should set this in your authentication middleware)
    const userId = req.user?._id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return apiResponse.error(res, "User not found", 404);

    // Create a new todo based on the request body
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      user: userId, // Associate the todo with the authenticated user
    });

    // Check if the todo already exists
    const todo = await Todo.findOne({ title: req.body.title });
    if (todo)
      return apiResponse.error(res, "Todo with same title already exists", 409);

    // Save the todo to the database
    const savedTodo = await newTodo.save();

    // Add the todo's ID to the user's todo array
    user.todo.push(savedTodo._id);
    await user.save();

    res.status(201).json(savedTodo); // Respond with the created todo
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to get a specific todo by its ID
const getSpecificTodoController = async (req, res) => {
  try {
    // Find the todo by its ID provided in the URL parameters
    const todo = await Todo.findById(req.params?.id);

    // Check if the todo was found
    if (!todo) {
      // If the todo is not found, send an error response with a 404 status code
      return apiResponse.error(res, "Todo not found", 404);
    }

    // If the todo is found, send a success response with the todo data
    return apiResponse.success(res, todo);
  } catch (error) {
    // Handle server errors by sending a general server error response
    return apiResponse.serverError(res);
  }
};

const deleteTodoController = async (req, res) => {
  try {
    // Find and remove the todo by its ID
    const deletedTodo = await Todo.findByIdAndRemove(req.params?.id);

    // Check if the todo was found and removed
    if (!deletedTodo) {
      return apiResponse.error(res, "Todo not found or already removed", 404);
    }

    // Find the user associated with the deleted todo
    const user = await User.findById(deletedTodo.user);

    if (!user) {
      return apiResponse.error(res, "User not found", 404);
    }

    // Remove the todo's ID from the user's todo array
    user.todo = user.todo.filter(
      (userTodoId) => !userTodoId.equals(deletedTodo._id)
    );

    await user.save(); // Save the updated user document

    return apiResponse.success(res, "Todo deleted successfully", 200);
  } catch (error) {
    return apiResponse.serverError(res);
  }
};

module.exports = {
  getAllTodoController,
  createTodoController,
  getSpecificTodoController,
  deleteTodoController,
};
