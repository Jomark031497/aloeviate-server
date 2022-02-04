import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { genSalt, hash } from "bcrypt";
import passport from "passport";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) return res.status(400).send("An account with this email already exists.");

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
    });

    await newUser.save();

    passport.authenticate("local", (err, user, _) => {
      if (err) throw err;
      if (!user) res.status(400).send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          return res.json({
            _id: user._id,
            username: user.username,
            tasks: user.tasks,
          });
        });
      }
    })(req, res, next);
    return null;
  } catch (err) {
    return res.json({ error: err.message, status: "error" });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local", async (err, user, _) => {
      try {
        if (err) return next(err); // premature return if errors found
        if (!user) return res.status(400).json({ error: "Usernames/Password is incorrect" }); // premature return if wrong credentials

        // authorize the login
        req.logIn(user, (err: Error) => {
          if (err) return next(err); // premature return if errors found
          res.status(200).json(user);
          next();
        });
      } catch (e) {
        return res.status(500).json({ error: "Something went wrong" });
      }
    })(req, res, next);
    return null;
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(404).json({ error: "no user found" }); // return if no user is found
    req.logout(); // logout curent session user
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const me = (req: Request, res: Response) => {
  const user: any = req.user;

  if (!user) return res.status(404).json({ error: "no user found" });

  return res.status(200).json({
    _id: user.id,
    username: user.username,
    tasks: user.tasks,
  });
};
