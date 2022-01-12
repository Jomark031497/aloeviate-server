import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import taskRoutes from "./routes/tasks.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import { config as dotenv } from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import authenticate from "./passport.config";

dotenv();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: <string>process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(<string>process.env.SECRET));
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // initialize session
authenticate(passport); // authenticate middleware

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.listen(PORT, async () => {
  try {
    await createConnection();
  } catch (error) {
    console.log(error);
  }
  console.log(`listening to port 8080`);
});
