import User from "../models/user.model";
import { compare } from "bcrypt";
import { Strategy as localStrategy } from "passport-local";

export default function (passport: any) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "User not found" });
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) return done(null, false);
        return done(null, user);
      } catch (e) {
        console.error(e);
        return done(e);
      }
    })
  );

  passport.serializeUser((user: any, done: any) => done(null, user._id));

  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      console.error(e);
      done(e);
    }
  });
}
