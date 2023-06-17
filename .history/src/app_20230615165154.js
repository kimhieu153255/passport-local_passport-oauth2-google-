const express = require("express");
const env = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "../public")));
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
app.set("trust proxy", 1);

// use env variables
env.config();
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  try {
    res.send("Hello World");
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
