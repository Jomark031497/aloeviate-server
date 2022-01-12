import { Router } from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/tasks.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/", requireAuth, addTask);

router.get("/", requireAuth, getTasks);

router.delete("/:id", requireAuth, deleteTask);

router.put("/:id", requireAuth, updateTask);

export default router;
