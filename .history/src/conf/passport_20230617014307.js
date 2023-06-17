const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user"); // Thay đổi đường dẫn đến model User của bạn

passport.use(
  new LocalStrategy((username, password, done) => {
    const userDB = User.findOne({ username }).exec();
    if (!userDB) {
      return done(null, false, { message: "Incorrect username." });
    }
    const isMatch = bcrypt.compare(password, userDB.password);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, userDB);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
