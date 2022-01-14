import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../types";
import PauseIcon from "@mui/icons-material/PauseCircle";
import PlayIcon from "@mui/icons-material/PlayCircle";
import TaskCard from "./TaskCard";

const TasksContainer: React.FC = () => {
  const { data: user } = useSelector((state: RootState) => state.user);
  const [playTimer, setPlayTimer] = useState(false);

  const [tasks, setTasks] = useState<Task[] | null>(null);

  const toggleTimer = () => {
    setPlayTimer(!playTimer);
  };

  useEffect(() => {
    if (user?.tasks!.length) {
      console.log("meron tasks lodibee");
      setTasks([user?.tasks[0]]);
    } else {
      console.log("wala task lodibee");
    }
  }, [user?.tasks]);

  return (
    <Box id="tasks-container" sx={{ mx: "auto" }}>
      <Box id="timer-container">
        <Typography variant="h2" align="center">
          00:00
        </Typography>
        <Typography variant="h6" align="center">
          No Task
        </Typography>

        <Box>{tasks && <>{tasks[0].name}</>}</Box>

        <Box id="timer-action-button" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6">-5</Typography>
          <IconButton sx={{ mx: "1rem" }} onClick={toggleTimer}>
            {playTimer ? <PauseIcon sx={{ fontSize: "4rem" }} /> : <PlayIcon sx={{ fontSize: "4rem" }} />}
          </IconButton>
          <Typography variant="h6">+5</Typography>
        </Box>
        {user && user.tasks?.map((task: Task) => <TaskCard task={task} key={task.id} />)}
      </Box>
    </Box>
  );
};

export default TasksContainer;
