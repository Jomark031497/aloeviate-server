import { Router } from "express";
import { addTask, deleteTask, showAllTasks, updateTask } from "../../controllers/tasks.controller";
import requireAuth from "../../middlewares/requireAuth";
const router = Router();

router.post("/:id", requireAuth, addTask);

router.get("/all/:id", requireAuth, showAllTasks);

router.delete("/:id", requireAuth, deleteTask);

router.put("/:id", requireAuth, updateTask);

export default router;
