const router = require("express").Router();
const passport = require("../conf/passport");
const userC = require("../controllers/user.c");

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("You are not authenticated");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// router.post("/login", userC.login);

router.post("/register", userC.register);

router.post("/logout", userC.logout);

module.exports = router;
