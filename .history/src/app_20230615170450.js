const express = require("express");
const env = require("dotenv");
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

// use env variables
env.config();
const port = process.env.PORT || 3000;

// Routes
// 404 error
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

// default route
app.get("/", (req, res, next) => {
  try {
    res.status(200).send("Hello World");
  } catch (error) {
    next(error);
  }
});

// handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
