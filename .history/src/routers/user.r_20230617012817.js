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

router.post("/logout", userC.logout);

module.exports = router;
