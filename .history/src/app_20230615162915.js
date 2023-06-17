const express = require("express");
const env = require("dotenv");
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");

// Passport config
require("./config/passport")(passport);

// setup morgan
app.use(morgan("dev"));

// Middlewares
app.use(cors());
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

env.config();
const port = process.env.PORT || 3000;

// Routes
app.use("/", (req, res) => {
  res.send("Hello World");
});

// handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});