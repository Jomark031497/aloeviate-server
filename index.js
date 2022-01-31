const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const tasksRoute = require("./routes/api/tasks.routes");
const userRoute = require("./routes/api/user.routes");
const dbConnect = require("./config/database");
const session = require("express-session");
const passport = require("passport");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.config")(passport);

// connecting to mongoDB
dbConnect(mongoose);

app.get("/", (req, res) => {
  res.send("test API working");
});

app.use("/api/auth", userRoute);
app.use("/api/tasks", tasksRoute);

// for deploying to heroku
if (process.env.NODE_ENV === "production") {
  // set a static folder
  app.use(express.static("../client/build"));
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../productivity-app", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
