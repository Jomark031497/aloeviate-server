import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../types";
import TaskCard from "./TaskCard";

const TasksContainer: React.FC = () => {
  const { data: tasks } = useSelector((state: RootState) => state.tasks);
  return (
    <Box id="tasks-container" sx={{ mx: "auto" }}>
      {tasks && tasks.map((task: Task) => <TaskCard task={task} key={task.id} />)}
    </Box>
  );
};

export default TasksContainer;
