const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//starts the server

// Setting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "config/config.env" });

// Connecting t0o database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    "\x1b[32;1m%s\x1b[0m",
    `Server started in ${process.env.NODE_ENV} mode on: localhost:${process.env.PORT}`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log("\x1b[31m%s\x1b[0m", `ERROR: ${err.stack}`);
  console.log(
    "\x1b[34m%s\x1b[0m",
    "Shutting down the server due to Unhandled Promise rejection"
  );
  server.close(() => {
    process.exit(1);
  });
});
