import { Router } from "express";
import { add } from "../../controllers/task.controller";
import requireAuth from "../../middlewares/requireAuth";

const router = Router();

router.post("/", requireAuth, add);

export default router;
