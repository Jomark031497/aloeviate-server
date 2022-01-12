import { Box } from "@mui/material";
import { Task } from "../types";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
}

const TasksContainer: React.FC<Props> = ({ tasks }) => {
  return (
    <Box id="tasks-container" sx={{ mx: "auto" }}>
      {tasks && tasks.map((task: Task) => <TaskCard task={task} key={task.id} />)}
    </Box>
  );
};

export default TasksContainer;
