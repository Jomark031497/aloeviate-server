import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskCard from "./TaskCard";

const TasksContainer: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <Box id="tasks-container" sx={{ mx: "auto" }}>
      {tasks.length ? (
        <>
          <Box>
            {tasks &&
              tasks.map((task) => {
                if (!task.isCompleted) {
                  return <TaskCard task={task} key={task.id} />;
                }
              })}
          </Box>
          <Divider sx={{ width: 260, m: "1rem auto" }} />
          <Box>
            {tasks &&
              tasks.map((task) => {
                if (task.isCompleted) {
                  return <TaskCard task={task} key={task.id} />;
                }
              })}
          </Box>
        </>
      ) : (
        <Typography align="center">No tasks available</Typography>
      )}
    </Box>
  );
};

export default TasksContainer;
