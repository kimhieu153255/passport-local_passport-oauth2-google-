const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username, password);
    const userDB = await User.findOne({ username }).exec();
    console.log(userDB.username, userDB.password);
    if (!userDB) {
      return done(null, false, { message: "Incorrect username." });
    }
    const isMatch = bcrypt.compareSync(password, userDB.password);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, userDB);
  })
);
//save user to session
passport.serializeUser((user, done) => {
  done(null, user);
});
//get user from session
passport.deserializeUser((id, done) => {
  // User.findOne({ _id: id })
  //   .then((user) => {
  //     done(null, user);
  //   })
  //   .catch((err) => done(err));
  done(null, id);
});

module.exports = passport;
