import {
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../features/tasks/updateTaskSlice";
import getFirstTask from "../utils/getFirstTask";
import dingSound from "../../assets/ding.mp3";
import useSound from "use-sound";
import timeFormatter from "../utils/timeFormatter";
import timeToSecs from "../utils/timeToSecs";
import lofi from "../../assets/lofi.mp3";
import jazz from "../../assets/jazz.m4a";
import classical from "../../assets/classical.m4a";

const Timer = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [dingPlay] = useSound(dingSound);
  const [song, setSong] = useState(lofi);
  const [genre, setGenre] = useState("lofi");
  const [play, { stop, isPlaying }] = useSound(song, {
    loop: true,
    interrupt: true,
  });

  const currentUser = useSelector((state) => state.currentUser);

  const [timerActive, setTimerActive] = useState(false);
  const [activeTask, setActiveTask] = useState("");
  const timeRef = useRef();
  const taskNameRef = useRef();

  const handleGenre = (e) => {
    setGenre(e.target.value);
    setSong("");
    if (isPlaying) stop();

    stop();
    if (e.target.value === "jazz") setSong(jazz);
    if (e.target.value === "lofi") setSong(lofi);
    if (e.target.value === "classical") setSong(classical);
  };

  const setCurrentBackground = (e) => {
    setSong("");
    if (isPlaying) stop();

    stop();
    if (e.target.value === "jazz") setSong(jazz);
    if (e.target.value === "lofi") setSong(lofi);
    if (e.target.value === "classical") setSong(classical);
  };

  const startTimer = (e) => {
    if (!currentUser.data.tasks.length) return;
    const task = getFirstTask(currentUser.data.tasks);

    if (!task) {
      resetTimerRefs();
      return;
    }

    if (activeTask && !task.elapsedTime) {
      // start the timer
    } else {
      // set the first incomplete task to the active task
      setActiveTask(task);
    }

    // Start the countdown timer
    setTimerActive(true);
  };

  const stopTimer = (e) => {
    // return if there ar eno active tasks
    if (!activeTask) return;
    // update the elapsed Time of the task
    dispatch(
      updateTask({
        userId: currentUser.data._id,
        taskId: activeTask._id,
        task: {
          ...activeTask,
          elapsedTime:
            activeTask.duration - timeToSecs(timeRef.current.innerHTML),
        },
      })
    );

    if (isPlaying) stop();

    stop();
    // stop/pause the timer
    setTimerActive(false);
  };

  useEffect(() => {
    // interval id
    let countdown;

    const filterIncompleteTasks = currentUser.data.tasks.filter(
      (task) => !task.isCompleted
    );

    if (!filterIncompleteTasks.length) {
      console.log(" i ran #1");
      clearInterval(countdown);
      setTimerActive(false);
      resetTimerRefs();
      setActiveTask("");
      stop();
    }

    if (
      filterIncompleteTasks.length &&
      filterIncompleteTasks[0].elapsedTime === 0
    ) {
      clearInterval(countdown);
      // timeRef.current.innerHTML = timeFormatter(
      //   filterIncompleteTasks[0].duration
      // );
      setActiveTask(filterIncompleteTasks[0]);
    }

    // if the timer is in active mode
    if (timerActive && activeTask) {
      console.log(" i ran #3");
      // set the duration to the duration of the active task - the elapsed time
      let duration = activeTask.duration - activeTask.elapsedTime;
      if (!isPlaying) play();

      countdown = setInterval(() => {
        // clear the interval and stop the clock if it reaches zero
        if (duration <= 1) {
          clearInterval(countdown);
          setTimerActive(false);
          resetTimerRefs();
          setActiveTask("");
          dispatch(
            updateTask({
              userId: currentUser._id,
              taskId: activeTask._id,
              task: {
                ...activeTask,
                isCompleted: true,
                elapsedTime: 0,
              },
            })
          );

          dingPlay();
          stop();
        }
        duration -= 1;
        timeRef.current.innerHTML = timeFormatter(duration);
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [
    timerActive,
    activeTask,
    dispatch,
    currentUser,
    play,
    dingPlay,
    stop,
    isPlaying,
  ]);

  const resetTimerRefs = () => {
    timeRef.current.innerHTML = "00:00";
    taskNameRef.current.innerHTML = "No Task";
  };

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3" ref={timeRef}>
          {activeTask && activeTask
            ? timeFormatter(activeTask.duration)
            : "00:00"}
        </Typography>
        <Typography variant="h6" className={classes.taskName} ref={taskNameRef}>
          {activeTask && activeTask ? activeTask.name : "No Task"}
        </Typography>

        {timerActive ? (
          <IconButton
            size="small"
            onClick={stopTimer}
            className={classes.iconButtons}
          >
            <PauseIcon className={classes.icons} />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            onClick={startTimer}
            className={classes.iconButtons}
          >
            <PlayIcon className={classes.icons} />
          </IconButton>
        )}

        <TextField
          select
          value={genre}
          onChange={handleGenre}
          disabled={timerActive}
        >
          <MenuItem value="lofi" onClick={setCurrentBackground}>
            Lofi
          </MenuItem>
          <MenuItem value="jazz" onClick={setCurrentBackground}>
            Jazz
          </MenuItem>
          <MenuItem value="classical" onClick={setCurrentBackground}>
            Classical
          </MenuItem>
        </TextField>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icons: {
    fontSize: "3rem",
  },
  taskName: {
    background: theme.palette.primary.main,
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    color: "#fff",
    fontWeight: "bold",
  },
  iconButtons: {
    margin: "0.5rem auto 0 auto",
  },
}));

export default Timer;
