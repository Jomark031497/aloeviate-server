import { Box, Typography, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import { useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/PauseCircle";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { minsToTimeFormat } from "../lib/timeFormatter";
import { setActiveTask, updateActiveTask } from "../redux/features/tasks/activeTaskSlice";

const Timer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: tasks } = useSelector((state: RootState) => state.tasks);
  const { data: activeTask } = useSelector((state: RootState) => state.activeTask);
  const [playTimer, setPlayTimer] = useState(false);

  const toggleTimer = () => {
    if (!activeTask) return;
    setPlayTimer(!playTimer);
  };

  // get the first task
  useEffect(() => {
    if (tasks?.length) {
      dispatch(setActiveTask(tasks[0]));
    } else {
      dispatch(setActiveTask(null));
    }
  }, [tasks, dispatch]);

  useEffect(() => {
    let countdown: any;
    // start the countodown timer
    if (playTimer && activeTask) {
      countdown = setInterval(() => {
        if (activeTask.duration <= 1) {
          dispatch(updateActiveTask({ ...activeTask, isCompleted: true }));
          clearInterval(countdown);
          setPlayTimer(false);
        }
        dispatch(
          updateActiveTask({ ...activeTask, duration: activeTask.duration - 1, elapsed: activeTask.elapsed + 1 })
        );
      }, 300);
    } else {
      // clear the countdown timer
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [playTimer, dispatch, activeTask]);

  return (
    <Box id="timer-container">
      {activeTask ? (
        <>
          <Typography variant="h2" align="center">
            {minsToTimeFormat(activeTask.duration)}
          </Typography>
          <Typography variant="h6" align="center">
            {activeTask.name}
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
