const router = require("express").Router();
const {
  addTask,
  showAllTasks,
  deleteTask,
  updateTask,
} = require("../../controllers/tasks.controller");

/**
 * METHOD:          POST
 * DESC:            ADD TASK TO A USER
 * COMPLETE ROUTE:  /api/users/task/:id
 * PROTECTED:       YES
 */
router.post("/task/:id", addTask);

/**
 * METHOD:          GET
 * DESC:            GET ALL TASKS FROM A USER
 * COMPLETE ROUTE:  /api/users/task/all/:id
 * PROTECTED:       YES
 */
router.get("/task/all/:id", showAllTasks);

/**
 * METHOD:          DELETE
 * DESC:            DELETE A SPECIFIC TASK FROM A USER
 * COMPLETE ROUTE:  /api/users/task/:id?task=:id
 * PROTECTED:       YES
 */
router.delete("/task/:id", deleteTask);

/**
 * METHOD:          PUT
 * DESC:            UPDATE A SPECIFIC TASK FROM A USER
 * COMPLETE ROUTE:  /api/users/task/:id?task=:id
 * PROTECTED:       YES
 */
router.put("/task/:id", updateTask);

module.exports = router;
