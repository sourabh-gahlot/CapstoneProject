const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const email = require("../utils/emailValidator");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  const existingEmail = await User.findOne({
    email: req.body.email,
  });

  if (existingEmail) {
    return res.status(400).send({
      message: "This email already exists.",
    });
  }

  const existingUserName = await User.findOne({
    username: req.body.username,
  });

  if (existingUserName) {
    return res.status(400).send({
      message: "This username already exists.",
    });
  }

  if (req.body.password.length < 6) {
    return res.status(400).send({
      message: "Password must be at least 6 characters.",
    });
  }

  if (!email.validateEmail(req.body.email)) {
    return res.status(400).send({
      message: "Email format is incorrect",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let userObj = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
  };

  try {
    const user = await User.create(userObj);
    res.status(200).send({
      msg: "Register Success!",
      user: user,
    });  
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
}

async function login(req, res) {
  const existingEmail = await User.findOne({
    email: req.body.email,
  });
 
  if (!existingEmail) {
    return res.status(400).send({
      message: "This email does not exist.",
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(400).send({
      message: "Password is incorrect.",
    });
  }

  const accessToken = jwt.sign({ _id: user._id }, process.env.jwtPrivateKey, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ _id: user._id }, process.env.jwtPrivateKey, {
    expiresIn: "30d",
  });

  res.header("x-auth-token", accessToken).status(200).send({
    msg: "Login Success",
    access_token: accessToken,
    user: user,
  });
}

function logout(req, res) {
  return res.status(200).send({
    msg: "Logged out!",
  });
}

module.exports = {
  signUp: signUp,
  login: login,
  logout:logout,
};
