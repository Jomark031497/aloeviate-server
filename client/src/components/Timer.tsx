import { Box, Typography, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/PauseCircle";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { minsToTimeFormat, timeFormatToSecs } from "../lib/timeFormatter";
import { completeTask } from "../redux/features/tasks/taskSlice";
import { setActiveTask, updateElapsed } from "../redux/features/tasks/activeTaskSlice";

const Timer: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const { data: activeTask } = useSelector((state: RootState) => state.activeTask);
  const [playTimer, setPlayTimer] = useState(false);
  const INTERVAL = 1000;
  const timerRef = useRef<any>(null);

  useEffect(() => {
    console.log("effect ran");
    // timer variable
    let countdown: any;
    // get all incomplete tasks
    const incompleteTasks = tasks.filter((task) => !task.isCompleted);

    // check if there are no incomplete tasks,
    if (!incompleteTasks) {
      setActiveTask(null);
      return;
    } else {
      // get the first element and set it to the current task
      dispatch(setActiveTask(incompleteTasks[0]));
    }

    // if timer is started and there is a current task
    if (playTimer && activeTask) {
      // get the duration / remaining duration
      let duration = activeTask.duration - activeTask.elapsed;

      // start the counter
      countdown = setInterval(() => {
        // a condition to stop the timer if duration is 0
        if (duration <= 1) {
          setPlayTimer(false);
          dispatch(completeTask(activeTask.id));
          clearInterval(countdown);
        }
        duration -= 1;
        timerRef.current.innerHTML = minsToTimeFormat(duration);
      }, INTERVAL);
    } else {
      if (!activeTask) return;
      const elapsed = activeTask.duration - timeFormatToSecs(timerRef.current.innerHTML);
      dispatch(updateElapsed({ ...activeTask, elapsed }));
    }

    return () => clearInterval(countdown);
  }, [playTimer, tasks]);

  return (
    <Box id="timer-container" sx={{ my: "1rem" }}>
      {activeTask ? (
        <>
          <Typography variant="h2" align="center" ref={timerRef}>
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
        {playTimer ? (
          <IconButton sx={{ mx: "1rem" }} onClick={() => setPlayTimer(false)}>
            <PauseIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        ) : (
          <IconButton sx={{ mx: "1rem" }} onClick={() => setPlayTimer(true)}>
            <PlayIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Timer;
