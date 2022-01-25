import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskCard from "./TaskCard";

const TasksContainer: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <Box id="tasks-container" sx={{ mx: "auto" }}>
      {tasks.length ? (
        tasks.map((task) => <TaskCard task={task} key={task.id} />)
      ) : (
        <Typography align="center">No tasks available</Typography>
      )}
    </Box>
  );
};

export default TasksContainer;
