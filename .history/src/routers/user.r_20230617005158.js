const router = require("express").Router();

const passport = require("../conf/passport");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/register", (req, res, next) => {
  res.send("register");
});
