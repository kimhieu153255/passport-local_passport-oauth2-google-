const mongoose = require("mongoose");

require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mongo_login";
