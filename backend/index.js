const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
require("dotenv").config();
const path = require("path");

const tasks = require("./routes/tasks.routes");

const app = express();

// middlewares

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/tasks", tasks);

// connecting to mongoDB
dbConnect();

if (process.env.NODE_ENV === "production") {
  // set a static folder
  app.use(express.static("../productivity-app/build"));
}

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../productivity-app", "build", "index.html")
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
