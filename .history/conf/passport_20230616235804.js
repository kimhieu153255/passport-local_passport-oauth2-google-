const passport = require("passport");
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
