const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const connectDB = require("./conf/db");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
//serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});
//deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//local strategy
passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/test",
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected to database");
        }
      }
    );
  })
);
