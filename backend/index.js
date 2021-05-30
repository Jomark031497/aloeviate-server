const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const strategy = require("./config/passport.setup");
require("dotenv").config();

// routes
const tasksRoute = require("./routes/tasks.routes");
const userRoute = require("./routes/user.routes");
const requireAuth = require("./middlewares/auth");

const app = express();

passport.use(strategy);

// database connection
const dbConnect = require("./config/database");

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/tasks", tasksRoute);
app.use("/users", userRoute);

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
