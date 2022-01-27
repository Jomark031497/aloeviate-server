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
  const timeRef = useRef<any>(null);
  const taskNameRef = useRef<any>(null);

  const getElapsedTime = (duration: number, currentTime: number) => {
    return duration - currentTime;
  };

  const getActiveTask = () => {
    const incompleteTasks = tasks.filter((task) => !task.isCompleted);
    if (!incompleteTasks.length) {
      setActiveTask(null);
    } else {
      dispatch(setActiveTask(incompleteTasks[0]));
    }
  };

  const clearRefs = () => {
    timeRef.current.innerHTML = "00:00";
    taskNameRef.current.innerHTML = "No Task";
  };

  const stopTimer = () => {
    clearRefs();
    setPlayTimer(false);
    getActiveTask();
  };

  useEffect(() => {
    // timer variable
    let countdown: any;

    getActiveTask();

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
          console.log("duration is less than 1 ");
        }
        if (timeRef.current === null) {
          clearInterval(countdown);
          setPlayTimer(false);
          console.log("timeRef.current is null --- ");
        } else {
          duration -= 1;
          timeRef.current.innerHTML = minsToTimeFormat(duration);
          const elapsed = getElapsedTime(activeTask.duration, timeFormatToSecs(timeRef.current.innerHTML));
          dispatch(updateElapsed({ ...activeTask, elapsed }));
          console.log("elserist im going to decrement ");
        }
      }, INTERVAL);
    } else {
      if (!activeTask) return;

      console.log("bottom else");
    }

    return () => clearInterval(countdown);
  }, [playTimer, tasks]);

  return (
    <Box id="timer-container" sx={{ my: "1rem" }}>
      {activeTask ? (
        <>
          <Typography variant="h2" align="center" ref={timeRef}>
            {minsToTimeFormat(activeTask.duration)}
          </Typography>
          <Typography variant="h6" align="center" ref={taskNameRef}>
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
