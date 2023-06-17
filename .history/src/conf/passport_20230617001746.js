const passport = require("passport");
const crypto = require("crypto");
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
  new LocalStrategy((username, password, done) => {
    
