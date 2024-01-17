const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(express.json());

const errorMiddleware = require("./middlewares/errors");
app.use(bodyParser.urlencoded({ extended: true }));

// Import all routes
const products = require("./routes/product");

app.use("/api/", products);

//middlewares comes after routes
//middleware
app.use(errorMiddleware);

module.exports = app;
