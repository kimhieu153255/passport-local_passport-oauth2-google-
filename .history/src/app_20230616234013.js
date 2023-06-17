const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const expressSession = require("express-session");
// const passport = require("passport");
//set up
env.config();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(passport.authenticate("session"));
//use mongodb session store
const store = require("../conf/session");
//use mongodb session store
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     cb(null, { id: user.id, username: user.username });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

// use env variables
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
