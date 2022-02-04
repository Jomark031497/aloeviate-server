import { genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import User from "../models/User.model";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // check if user exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: "username/password already exists" });

    // hash password
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // save the user
    user = await newUser.save();
    return res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // authenticate the login
    passport.authenticate("local", async (err, user, _) => {
      try {
        if (err) return next(err);
        if (!user) return res.status(400).json({ error: "Usernames/Password is incorrect" });

        // authorize the login
        req.logIn(user, (err: Error) => {
          if (err) return next(err);

          res.status(200).json({
            _id: user.id,
            username: user.username,
          });
          next();
        });
      } catch (e) {
        return res.status(500).json({ error: "Something went wrong" });
      }
    })(req, res, next);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
  return null;
};

export const me = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
