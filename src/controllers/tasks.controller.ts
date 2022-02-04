import { Request, Response } from "express";
import User from "../models/user.model";

export const addTask = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          tasks: req.body,
        },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      tasks: user.tasks,
      msg: "Task successfully added",
      status: true,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const showAllTasks = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ tasks: user.tasks });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          tasks: { _id: req.query.task },
        },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ msg: "Task successfully deleted", status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { name, duration, elapsedTime, isCompleted } = req.body;

    await User.findOneAndUpdate(
      {
        _id: req.params.id,
        "tasks._id": req.query.task,
      },
      {
        $set: {
          "tasks.$.name": name,
          "tasks.$.duration": duration,
          "tasks.$.elapsedTime": elapsedTime,
          "tasks.$.isCompleted": isCompleted,
        },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ message: "Task successfully updated", status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
