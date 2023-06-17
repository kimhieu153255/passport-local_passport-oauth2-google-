const router = require("express").Router();

const passport = require("../conf/passport");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
