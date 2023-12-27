const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
      })
      .then((con) => {
        console.log(
          `MongoDB Database connected with HOST: ${con.connection.host}`
        );
      });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Handle the error or display a message to the user
  }
};

module.exports = connectDatabase;
