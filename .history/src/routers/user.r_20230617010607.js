const router = require("express").Router();
const passport = require("../conf/passport");
const userC = require("../controllers/user.c");

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

router.post("/login", userC.login);

router.post("/register", userC.register);

router.get("/logout", (req, res, next) => {
  res.send("logout");
});

module.exports = router;
