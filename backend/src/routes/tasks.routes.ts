import { Router } from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/tasks.controller";

const router = Router();

router.post("/", addTask);

router.get("/", getTasks);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

export default router;
