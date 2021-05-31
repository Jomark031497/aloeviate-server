const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user is already in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(401).json({ msg: "Wrong email or password" });
    // de-hash password
    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!hashedPassword)
      return res.status(401).json({ msg: "Wrong email or password" });

    return res
      .status(200)
      .json({ username: req.user.username, id: req.user._id });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: err.message, status: "error" });
  }
};

const logout = (req, res) => {
  try {
    req.logout();
    res
      .clearCookie("auth")
      .status(200)
      .json({ message: "cleared cookie and logged out" });
  } catch (err) {
    res.status(400).json({ error: err.message, status: "error" });
  }
};

const me = (req, res) => {
  res.send(req.user);
};

module.exports = { login, register, logout, me };
