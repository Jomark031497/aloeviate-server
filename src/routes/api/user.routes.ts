import express from "express";
const router = express.Router();
import { login, register, logout, me } from "../../controllers/user.controller";

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", me);

export default router;
