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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());

// use env variables
env.config();
const port = process.env.PORT || 3000;

// Routes
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
