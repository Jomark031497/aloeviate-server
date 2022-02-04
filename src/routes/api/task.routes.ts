import { Router } from "express";
import { add, deleteTask, getTask, getTasks, updateTask } from "../../controllers/task.controller";
import requireAuth from "../../middlewares/requireAuth";

const router = Router();

router.post("/", requireAuth, add);

router.get("/", requireAuth, getTasks);

router.get("/:id", requireAuth, getTask);

router.put("/:id", requireAuth, updateTask);

router.delete("/:id", requireAuth, deleteTask);

export default router;
