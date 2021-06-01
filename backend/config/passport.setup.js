const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user, { message: "serialize" });
  });

  passport.deserializeUser(async (id, done) => {
    console.log("desi");
    try {
      let user = await User.findById(id);
      if (!user)
        return done(null, false, { message: "Wrong username or password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });

  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user)
          return done(null, false, { message: "Wrong username or password" });

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass)
          return done(null, false, { message: "Wrong username or password" });

        return done(null, user, { message: "localStrat" });
      } catch (err) {
        return done(err);
      }
    })
  );
};
