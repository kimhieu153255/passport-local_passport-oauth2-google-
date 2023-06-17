const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,