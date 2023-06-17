// thiết lập passport

// Path: src\conf\passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const userDB = User.findOne({ username }).exec();
    if (!userDB) {
      return done(null, false, { message: "Incorrect username." });
    }
    const isMatch = await bcrypt.compare(password, userDB.password);
    if (isMatch) {
      return done(null, userDB);
    }
    return done(null, false, { message: "Incorrect password." });
  })
);
