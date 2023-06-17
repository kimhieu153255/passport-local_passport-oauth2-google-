const OAuth2Strategy = require("passport-oauth2").Strategy;

module.exports = (passport) => {
  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenURL: "https://oauth2.googleapis.com/token",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:20474/user/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        done(null, accessToken);
      }
    )
  );

  passport.serializeUser = (accessToken, done) => {
    done(null, accessToken);
  };

  passport.deserializeUser = (accessToken, done) => {
    done(null, accessToken);
  };
};