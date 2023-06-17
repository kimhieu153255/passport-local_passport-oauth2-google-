const User = require("./models/user");
const bcrypt = require("bcrypt");

//register user
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, hashedPassword, salt });
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

//login user
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;


//logout user
exports.logout = async (req, res, next) => {
  try {
    req.logout();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
