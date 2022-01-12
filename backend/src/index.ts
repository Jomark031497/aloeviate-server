import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import taskRoutes from "./routes/tasks.routes";
import cors from "cors";
import { config as dotenv } from "dotenv";

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

app.use("/api/tasks", taskRoutes);

app.listen(PORT, async () => {
  try {
    await createConnection();
  } catch (error) {
    console.log(error);
  }
  console.log(`listening to port 8080`);
});
