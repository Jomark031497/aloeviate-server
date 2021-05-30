const express = require("express");
const router = express.Router();
const {
  addTask,
  showAllTasks,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");
const requireAuth = require("../middlewares/auth");

router.post("/", addTask);

router.get("/", requireAuth, showAllTasks);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

module.exports = router;
