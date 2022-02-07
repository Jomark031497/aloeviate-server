import express from "express";
import cors from "cors";
import { config as dotenv } from "dotenv";
import dbConnect from "./utils/mongodb.config";
import session from "express-session";
import passport from "passport";
import authRoute from "./routes/api/auth.routes";
import taskRoute from "./routes/api/task.routes";
import authenticate from "./utils/passport.config";
import MongoStore from "connect-mongo";

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
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
authenticate(passport);

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Listening at port ${PORT}`);
});
