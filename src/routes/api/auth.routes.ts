import { Router } from "express";
import { login, me, register } from "../../controllers/auth.controller";
import requireAuth from "../../middlewares/requireAuth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", requireAuth, me);

export default router;
