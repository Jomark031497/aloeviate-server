const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const register = async (req, res) => {
  try {
    const { username, password, next } = req.body;
    const user = await User.findOne({ username });
    if (user)
      return res.json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
    });

    await newUser.save();

    res.json({
      id: newUser._id,
      username: newUser.username,
      tasks: newUser.tasks,
    });
  } catch (err) {
    res.json({ error: err.message, status: "error" });
  }
};
const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({ _id: user._id, username: user.username, tasks: user.tasks });
      });
    }
  })(req, res, next);
};

const logout = (req, res) => {
  try {
    if (!req.user) throw err;
    req.logout();
    res.status(200).json({ message: "cleared cookie and logged out" });
  } catch (err) {
    res.status(400).json({ error: err, status: "error" });
  }
};

const me = (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user.id,
      username: req.user.username,
      tasks: req.user.tasks,
    });
  } else {
    res.status(200).send("");
  }
};

module.exports = { login, register, logout, me };
