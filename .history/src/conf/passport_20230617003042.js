const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
//serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});
//deserialize user
passport.deserializeUser((id, done) => {
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

exports.passport = passport;
