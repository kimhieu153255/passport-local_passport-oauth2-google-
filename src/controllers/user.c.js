const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //check trùng
    let userDB = await User.findOne({ username }).exec();
    if (userDB) {
      return res.status(400).send("Username already exists");
    }
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

///////////////////////login with passport-jwt///////////////////////
exports.jwtLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    User.findOne({ username }).then((user) => {
      if (!user) {
        return res.status(400).send("User not found");
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id,
            username: user.username,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            //authentication token expires in 20s
            expiresIn: 60,
          });
          //them token vao header
          res.setHeader("Authorization", "Bearer " + token);
          res.status(200).send({ token });
        } else {
          res.status(400).send("Password incorrect");
        }
      });
    });
  } catch (error) {
    next(error);
  }
};
