const express = require("express");
const router = express.Router();
const passport = require("passport");

const { login, register, logout } = require("../controllers/user.controller");

router.post("/register", register);

router.post("/login", passport.authenticate("local"), login);

module.exports = router;
