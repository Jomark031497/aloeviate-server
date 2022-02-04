import { Router } from "express";
import requireAuth from "../../middlewares/requireAuth";
import { login, register, logout, me } from "../../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);

export default router;
