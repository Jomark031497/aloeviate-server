const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const pool = require("./postgres");

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        User.findOne({ username: username }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      } catch (err) {
        console.error(err.message);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id);
      if (!user)
        return done(null, false, { message: "Wrong username or password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};
