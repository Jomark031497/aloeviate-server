const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) throw err;

        if (!user) return done(null, false, { message: "username not found" });

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;

          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: "incorrect password" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id, { message: "serialize" });
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
