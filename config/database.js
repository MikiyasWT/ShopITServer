const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
      })
      .then((con) => {
        console.log(
          "\x1b[32m%s\x1b[0m",
          `MongoDB Database connected: ${con.connection.host}:${con.connection.port}`
        );
      });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Handle the error or display a message to the user
  }
};

module.exports = connectDatabase;
