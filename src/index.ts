import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config as dotenv } from "dotenv";
import dbConnect from "./utils/mongodb.config";
import session from "express-session";
import passport from "passport";
import authRoute from "./routes/api/auth.routes";
import taskRoute from "./routes/api/task.routes";
import authenticate from "./utils/passport.config";

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

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Listening at port ${PORT}`);
});
