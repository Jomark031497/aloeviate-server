import { Request, Response } from "express";
import Task from "../entities/Task";

export const addTask = async (req: Request, res: Response) => {
  const { name, duration } = req.body;
  console.log("i ran");
  try {
    if (name === "") return res.status(400).json({ name: "name cannot be empty" });
    const task = new Task({
      name,
      duration,
      elapsed: 0,
      isCompleted: false,
    });
    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getTasks = async (_: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneOrFail(id);
    await task.remove();
    return res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { name, duration, isCompleted } = req.body;
  const { id } = req.params;
  try {
    let task = await Task.findOneOrFail(id);

    task.name = name;
    task.duration = duration;
    task.isCompleted = isCompleted;

    await task.save();

    task = await Task.findOneOrFail(id);

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};
