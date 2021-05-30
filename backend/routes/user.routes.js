const express = require("express");
const router = express.Router();
const passport = require("passport");

const { login, register, logout } = require("../controllers/user.controller");

router.post("/register", register);

router.post("/login", passport.authenticate("local"), login);

router.get("/logout", logout);

router.get("/me", (req, res) => {
  try {
    res.status(200).json({ username: req.user.username, id: req.user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
