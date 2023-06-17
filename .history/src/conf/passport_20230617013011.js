// thiết lập passport

// Path: src\conf\passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(new LocalStrategy(async (username, password, done) => {}));
