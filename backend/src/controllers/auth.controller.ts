import { genSalt, hash } from "bcrypt";
import { isEmpty, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import User from "../entities/User";
import { mapErrors } from "../helpers/utils";

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    let errors: any = {};
    const checkUser = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });
    if (checkUser) errors.username = "Username is already taken";
    if (checkEmail) errors.email = "Email is already taken";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = new User({
      username,
      password: hashedPassword,
      email,
    });
    errors = await validate(user);
    if (errors.length > 0) return res.status(400).json(mapErrors(errors));
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body; // destructure fields
  try {
    let errors: any = {}; // initialize variables to store errors

    // check if the fields are empty
    if (isEmpty(username)) errors.username = "Username must not be empty";
    if (isEmpty(password)) errors.password = "Password must not be empty";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors); // premature return if errors found

    // authenticate the login
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
  } catch (e) {
    return res.status(400).json(e);
  }
  return null;
};
