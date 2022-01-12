import { Box } from "@mui/material";
import useSWR from "swr";
import { Task } from "../types";
import TaskCard from "./TaskCard";

const TasksContainer = () => {
  const { data: tasks } = useSWR("/tasks");

  return (
    <Box id="tasks-container" sx={{ mx: "auto" }}>
      {tasks && tasks.map((task: Task) => <TaskCard task={task} key={task.id} />)}
    </Box>
  );
};

export default TasksContainer;
