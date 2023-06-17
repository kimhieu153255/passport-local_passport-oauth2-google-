const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("./models/User");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
//serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});
//deserialize user
passport.deserializeUser((username, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);