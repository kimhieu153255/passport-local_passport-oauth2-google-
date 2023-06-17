const express = require("express");
const session = require("express-session");
const passport = require("./conf/passport");
const morgan = require("morgan");
const path = require("path");
// const MongoDBStore = require("connect-mongo")(session);
require("dotenv").config();
const app = express();

//variables
const PORT = process.env.PORT || 3000;

//use session middleware

// const store = new MongoDBStore({
//   // Cấu hình kết nối MongoDB
//   mongooseConnection: mongoose.connection,
//   collection: "sessions", // Tên collection lưu trữ session
// });
// store.on("error", function (error) {
//   console.log("MongoDB session store error:", error);
// });

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Thời gian sống của cookie (1 ngày)
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

// authentication
app.use((req, res, next) => {
  if(req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
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
