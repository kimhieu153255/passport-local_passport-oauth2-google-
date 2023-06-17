const User = require("../models/user");
const bcrypt = require("bcrypt");

//register user
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPassword,
      salt,
    });
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//logout user
exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).send("Logout success");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//login user
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      return res.status(400).send("Please provide username and password");
    }
    // tìm user
    const userDB = await User.findOne({ username }).exec();
    if (!userDB) {
      return res.status(400).send("Invalid credentials");
    }
    // so sánh password
    const isMatch = await bcrypt.compare(password, userDB.password);
    if (isMatch) {
      return res.status(200).send("Login success");
      req.session.user = userDB;
    }
    res.status(400).send("Invalid credentials");
  } catch (err) {
    next(err);
  }
};
