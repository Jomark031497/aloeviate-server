const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const tasksRoute = require("./routes/api/tasks.routes");
const userRoute = require("./routes/api/user.routes");
const dbConnect = require("./config/database");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    name: "auth",
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.setup")(passport);

//routes
app.use("/api/users", tasksRoute);
app.use("/api/users", userRoute);

// connecting to mongoDB
dbConnect();

// for deploying to heroku
if (process.env.NODE_ENV === "production") {
  // set a static folder
  app.use(express.static("../productivity-app/build"));
  app.use(express.static(path.join(__dirname, "../productivity-app/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../productivity-app", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
