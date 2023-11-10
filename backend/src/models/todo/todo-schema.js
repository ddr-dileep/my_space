const mongoose = require("mongoose");

// Define the "Todo" schema
const todoSchema = new mongoose.Schema({
  // Title field, a string that is required
  title: {
    type: String,
    required: true,
  },

  // Description field, a string that is required
  description: {
    type: String,
    required: true,
  },

  // image field, a string that is required
  image: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Todos_Logo.svg/1200px-Todos_Logo.svg.png",
  },

  // Completed field, a boolean with a default value of 'false'
  completed: {
    type: Boolean,
    default: false,
  },

  // pending field, a boolean with a default value of 'false'
  pending: {
    type: Boolean,
    default: true,
  },

  // User field, a reference to a 'User' document (assuming you have a 'User' model)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' model
    required: true,
  },

  // createdAt field, a Date field with a default value of the current date and time when the 'Todo' document is created
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // updatedAt field, a Date field with a default value of the current date and time when the 'Todo' document is created or updated
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the "Todo" model based on the todoSchema
const Todo = mongoose.model("Todo", todoSchema);

// Export the "Todo" model
module.exports = Todo;
