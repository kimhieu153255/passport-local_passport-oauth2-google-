const router = require("express").Router();
const passport = require("../conf/passport");
const userC = require("../controllers/user.c");

const middleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user", req.user);
    next();
  } else {
    res.status(401).send("You are not authenticated");
  }
};

//use passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// router.post("/login", userC.login); //not use passport
//register user
router.post("/register", userC.register);
//logout user
router.post("/logout", middleware, userC.logout);
//goole login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

router.get("/success", (req, res) => {
  res.send("Login oauth success");
});

module.exports = router;
