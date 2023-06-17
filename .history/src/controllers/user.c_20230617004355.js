const User = require("./models/user");

//register user
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ username, password });
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
