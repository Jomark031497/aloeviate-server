import { Box, Typography, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/PauseCircle";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../types";
import { minsToTimeFormat } from "../lib/timeFormatter";

const Timer: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks.length) {
      setCurrentTask(tasks[0]);
    } else {
      setCurrentTask(null);
    }
  }, [tasks]);

  const [playTimer, setPlayTimer] = useState(false);
  const toggleTimer = () => setPlayTimer((prev) => !prev);

  return (
    <Box id="timer-container" sx={{ my: "1rem" }}>
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
