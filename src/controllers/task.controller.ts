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

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().where("user").equals(req.user);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404).json({ error: "task not found" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const { name, duration } = req.body;
  try {
    let task = await Task.findById(_id);
    if (!task) return res.status(404).json({ error: "task not found" });
    task.name = name;
    task.duration = duration;

    task = await task.save();

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404).json({ error: "task not found" });
    await task.remove();
    return res.status(200).json({ message: "task removed" });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
