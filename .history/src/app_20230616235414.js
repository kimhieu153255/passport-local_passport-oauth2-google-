const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongo")(session);
require("dotenv").config();
const app = express();

//use session middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.listen(3000, () => {
  console.log(`Server started on port {}`);
});
