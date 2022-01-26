import { Box, Typography, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/PauseCircle";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { Task } from "../types";
import { minsToTimeFormat, timeFormatToSecs } from "../lib/timeFormatter";
import { completeTask } from "../redux/features/tasks/taskSlice";

const Timer: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [playTimer, setPlayTimer] = useState(false);

  const timerRef = useRef<any>(null);

  const startTimer = () => {
    if (!currentTask) return;
    setPlayTimer(true);
  };

  const stopTimer = () => {
    if (!currentTask) return;
    // update the currentTask's duration and elapsed time
    const totalElapsed = currentTask.duration - timeFormatToSecs(timerRef.current.innerHTML);
    setCurrentTask({ ...currentTask, elapsed: totalElapsed });
    setPlayTimer(false);
  };

  useEffect(() => {
    if (tasks.length) {
      const incompleteTasks = tasks.filter((task) => !task.isCompleted);
      if (!incompleteTasks) setCurrentTask(null);
      setCurrentTask(incompleteTasks[0]);
    } else {
      setCurrentTask(null);
    }
  }, [tasks]);

  useEffect(() => {
    let countdown: any;

    if (!currentTask) return;

    if (playTimer) {
      let duration = currentTask.duration - currentTask.elapsed;

      countdown = setInterval(() => {
        if (duration <= 1) {
          setPlayTimer(false);
          dispatch(completeTask(currentTask.id));
          clearInterval(countdown);
        }

        duration -= 1;
        timerRef.current.innerHTML = minsToTimeFormat(duration);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [playTimer, currentTask, dispatch]);

  return (
    <Box id="timer-container" sx={{ my: "1rem" }}>
      {currentTask ? (
        <>
          <Typography variant="h2" align="center" ref={timerRef}>
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
        {playTimer ? (
          <IconButton sx={{ mx: "1rem" }} onClick={stopTimer}>
            <PauseIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        ) : (
          <IconButton sx={{ mx: "1rem" }} onClick={startTimer}>
            <PlayIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Timer;
