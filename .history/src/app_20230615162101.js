const express = require("express");
const env = require("dotenv");
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

env.config();
const port = process.env.PORT || 3000;

// Import Routes

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
