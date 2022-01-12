import { Box, Typography, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import { useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/PauseCircle";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { minsToTimeFormat } from "../lib/timeFormatter";
import { Task } from "../types";

const Timer: React.FC = () => {
  const [playTimer, setPlayTimer] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const { data: tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (tasks?.length) {
      const firstTask = tasks[0];
      setCurrentTask(firstTask);
    } else {
      setCurrentTask(null);
    }
  }, [tasks]);

  const toggleTimer = () => {
    if (!currentTask) return;
    setPlayTimer(!playTimer);
  };

  return (
    <Box id="timer-container">
      {currentTask ? (
        <>
          <Typography variant="h2" align="center">
            {minsToTimeFormat(currentTask.duration)}
          </Typography>
          <Typography variant="h6" align="center">
            {currentTask.name}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h2" align="center">
            00:00
          </Typography>
          <Typography variant="h6" align="center">
            No Task
          </Typography>
        </>
      )}

      <Box id="timer-action-button" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">-5</Typography>
        <IconButton sx={{ mx: "1rem" }} onClick={toggleTimer}>
          {playTimer ? <PauseIcon sx={{ fontSize: "4rem" }} /> : <PlayIcon sx={{ fontSize: "4rem" }} />}
        </IconButton>
        <Typography variant="h6">+5</Typography>
      </Box>
    </Box>
  );
};

export default Timer;
