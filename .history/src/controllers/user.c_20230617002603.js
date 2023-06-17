const User = require("./models/User");

//register user
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
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
