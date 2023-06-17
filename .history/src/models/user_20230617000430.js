const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const connectDB = require("../conf/db");

const UserSchema = new Schema({
  username: String,
  password: String,
  salt: String,
});
