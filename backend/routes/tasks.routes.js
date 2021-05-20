const express = require("express");
const router = express.Router();
const {
  addTask,
  showAllTasks,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");

router.post("/", addTask);

router.get("/", showAllTasks);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

module.exports = router;
