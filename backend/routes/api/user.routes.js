const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  login,
  register,
  logout,
  me,
} = require("../../controllers/user.controller");
const { checkNotAuthenticated } = require("../../middlewares/auth");

router.post("/register", register);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;

    if (!user) {
      res.status(400).json(info);
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(user);
      });
    }
  })(req, res, next);
});

router.get("/logout", logout);

router.get("/me", me);

module.exports = router;
