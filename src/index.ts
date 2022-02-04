import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config as dotenv } from "dotenv";
import dbConnect from "./config/database";
import session from "express-session";
import passport from "passport";
import authenticate from "./config/passport.config";
import userRoutes from "./routes/api/auth.routes";
import tasksRoutes from "./routes/api/tasks.routes";

dotenv();
const app = express();
const PORT = process.env.PORT || 8080;
// middlewares
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
app.use(passport.initialize());
app.use(passport.session());
authenticate(passport);

// connecting to mongoDB
dbConnect();

app.get("/", (_, res) => {
  res.send("test API working");
});

app.use("/api/auth", userRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
