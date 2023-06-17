const express = require("express");
const session = require("express-session");
const passport = require("./conf/passport");
const morgan = require("morgan");
const path = require("path");
const MongoDBStore = require("connect-mongo")(session);
require("dotenv").config();
const app = express();

//variables
const PORT = process.env.PORT || 3000;

//use session middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan("dev"));
// app.use(passport.initialize());
// app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
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
