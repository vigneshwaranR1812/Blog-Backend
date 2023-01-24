const mongoose = require("mongoose");
const colors = require("colors");

const Connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.URI);
    console.log("Successfully Connected to MongoDB!!".bgWhite);
  } catch (error) {
    console.log(`Error ${error.message}`.bgWhite);
  }
};

module.exports = Connect;
