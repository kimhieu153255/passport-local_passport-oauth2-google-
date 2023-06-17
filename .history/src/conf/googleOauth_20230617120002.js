const OAuth2Strategy = require("passport-oauth2").Strategy;

module.exports = new OAuth2Strategy(
  {
    authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenURL: "https://oauth2.googleapis.com/token",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/user/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    console.log("profile", profile);
    done(null, profile);
  }
);

// exports.serializeUser = (user, done) => {
//   done(null, user.id);
// }

// exports.deserializeUser = (id, done) => {
//   User.findOne({ _id: id })
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => done(err));
// }