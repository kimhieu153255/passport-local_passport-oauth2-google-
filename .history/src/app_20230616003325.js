const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const expressSession = require("express-session");
//
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// use env variables
env.config();
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res, next) => {
  try {
    res.status(200).send("Hello World");
  } catch (error) {
    next(error);
  }
});

// handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
