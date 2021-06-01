const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("passport");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Please enter all required fields" });

    // check if user is already registered in the database
    const user = await User.findOne({ username });

    if (user) return res.status(400).json({ user: user.username });

    // hashing the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(200).json({ user: savedUser.username });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "error" });
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json(info);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({ _id: user._id, username: user.username });
    });
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
    res.status(200).json({ _id: req.user.id, username: req.user.username });
  } else {
    res.status(200).send(false);
  }
};

module.exports = { login, register, logout, me };
