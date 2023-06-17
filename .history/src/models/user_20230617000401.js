const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: String,
  password: String,
  salt: String,
});

UserSchema.pre("save", function (next) {