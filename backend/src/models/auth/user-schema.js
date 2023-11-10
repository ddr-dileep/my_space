const mongoose = require("mongoose");

// Define the schema for the "User" model
const userSchema = mongoose.Schema({
  // Username field, a string that is required and must be unique
  username: {
    type: String,
    required: true,
    unique: true,
  },

  // Email field, a string that is required and must be unique
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // image field, a string that is required
  image: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },

  // Password field, a string that is required (you should hash and salt passwords for security)
  password: {
    type: String,
    required: true,
  },

  // createdAt field, a Date field with a default value of the current date and time when the document is created
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // updatedAt field, a Date field with a default value of the current date and time when the document is created or updated
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // todo field, an array of references to "Todo" documents
  todo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

// Create the "User" model based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the "User" model
module.exports = User;
