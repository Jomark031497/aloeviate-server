const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
require("dotenv").config();

const tasks = require("./routes/tasks.routes");

const app = express();
const PORT = process.env.PORT;

// middlewares

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/tasks", tasks);

// connecting to mongoDB
dbConnect();

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
