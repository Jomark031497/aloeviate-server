const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const passport = require("passport");

const strategy = new localStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: "No user found" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return done(null, false, { message: "incorrect password" });

    return done(null, user, { message: "localStrat" });
  } catch (err) {
    return done(err);
  }
});

passport.serializeUser((user, done) => {
  console.log("serialize!");
  done(null, user.id, { message: "serialize" });
});

passport.deserializeUser(async (id, done) => {
  console.log("deserialize!");
  try {
    let user = await User.findById(id);
    if (!user) return done(null, false, { message: "Incorrect username." });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = strategy;
