const express = require("express");
const session = require("express-session");
const passport = require("./conf/passport");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = express();

//variables
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

//conf googleOauth
require("./conf/googleOauth")(passport);

//conf passport-jwt
require("./conf/passport-jwt")(passport);

const middleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user", req.user);
    next();
  } else {
    res.status(401).send("You are not authenticated");
  }
};

//user googleOAuth
app.get("/", middleware, (req, res) => {
  //method post
  res.send(
    "<form action='/user/logout' method='post'><button type='submit'>Logout</button></form>"
  );
});

const userRouter = require("./routers/user.r");
app.use("/user", userRouter);

//handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
