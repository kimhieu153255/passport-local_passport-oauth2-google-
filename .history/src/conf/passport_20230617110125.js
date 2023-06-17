const passport = require("passport");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user"); // Thay đổi đường dẫn đến model User của bạn

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username, password);
    const userDB = await User.findOne({ username }).exec();
    console.log(userDB.username, userDB.password);
    if (!userDB) {
      return done(null, false, { message: "Incorrect username." });
    }
    const isMatch = bcrypt.compareSync(password, userDB.password);

    if (!isMatch2) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, userDB);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;
