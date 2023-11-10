const mongoose = require('mongoose');
require("dotenv").config();

const databaseConfigurations = async () =>{
    try {
      await mongoose.connect(process.env.DATABASE_CONNECTION, {
        useNewUrlParser: "true",
        useUnifiedTopology: "true",
      });
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.log(error);
    }
}

module.exports = databaseConfigurations;