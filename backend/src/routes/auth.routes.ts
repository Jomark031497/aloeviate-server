import { Router } from "express";
import { login, logout, me, register } from "../controllers/auth.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.get("/logout", requireAuth, logout);

export default router;
