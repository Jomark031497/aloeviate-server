const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireAuth = require("../middlewares/auth");

const {
  login,
  register,
  logout,
  me,
} = require("../controllers/user.controller");

router.post("/register", register);

router.post("/login", passport.authenticate("local"), login);

router.get("/logout", logout);

router.get("/me", me);

module.exports = router;
