import { Response, Request } from "express";
import Task from "../models/Task.model";

export const add = async (req: Request, res: Response) => {
  const { name, duration } = req.body;
  const user = req.user;
  try {
    const newTask = new Task({
      name,
      duration,
      user,
    });

    const task = await newTask.save();
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
