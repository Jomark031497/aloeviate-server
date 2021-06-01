const Users = require("../models/user.model");

const addTask = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    await user.tasks.push(req.body);

    await user.save();

    res.status(200).json({ tasks: user.tasks, msg: "success" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const showAllTasks = async (req, res) => {
  try {
    const Tasks = await Task.find();
    res.json(Tasks);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    await task.remove();

    res
      .status(200)
      .json({ success: true, message: "Task successfully deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, task });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = { addTask, showAllTasks, deleteTask, updateTask };
