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
      (req, accessToken, refreshToken, profile, done) => {
        console.log("req", req);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        done(null, accessToken);
      }
    )
  );

  passport.serializeUser = (user, done) => {
    done(null, user);
  };

  passport.deserializeUser = (user, done) => {
    
  };
};
