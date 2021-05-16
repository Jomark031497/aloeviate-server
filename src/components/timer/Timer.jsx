import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import { TaskContext } from "../../context/TaskContext";
import { useContext, useEffect, useRef, useState } from "react";
import { timeFormatter, timeToSecs } from "../../utils/timeParser";

const Timer = () => {
  const classes = useStyles();
  const { tasks, dispatch } = useContext(TaskContext);

  const [active, setActive] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const timeRef = useRef();

  // The countdown timer will now start
  const startTimer = (e) => {
    // button won't work if there are no tasks
    if (!tasks.length) return;

    // fetch all tasks that are not completed yet
    const filteredTasks = tasks.filter((task) => !task.isCompleted);

    // if there are no tasks left, return
    if (!filteredTasks.length) {
      console.log(" no tasks left");
      return;
    }
    // set the active state to true
    setActive((prev) => !prev);

    // set the activeTask to the first task in the context
    if (activeTask === null) setActiveTask(filteredTasks[0]);
  };

  const stopTimer = (e) => {
    // toggle the active state
    setActive((prev) => !prev);

    // adding elapsed time so that when resuming, it will not start at the beginning
    setActiveTask({
      ...activeTask,
      elapsedTime: activeTask.duration - timeToSecs(timeRef.current.innerHTML),
    });
    dispatch({
      type: "UPDATE_ELAPSED",
      payload: {
        id: activeTask.id,
        elapsedTime: timeToSecs(timeRef.current.innerHTML),
      },
    });
  };

  useEffect(() => {
    // interval id
    let countdown;
    const dingAudio = new Audio("assets/ding.mp3");
    // button state if it is active (play)
    if (active) {
      // calculate the duration if ever there's an elapsed time already
      let duration = activeTask.duration - activeTask.elapsedTime;

      // the countdown
      countdown = setInterval(() => {
        if (duration <= 1) {
          clearInterval(countdown);

          // toggle the active state
          setActive((prev) => !prev);
          // update to complete the task
          dispatch({ type: "COMPLETE_TASK", payload: { id: activeTask.id } });
          // remove the current task
          setActiveTask(null);
          // play the ding audio
          dingAudio.play();
        }
        duration -= 1;
        timeRef.current.innerHTML = timeFormatter(duration);
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [active, activeTask, dispatch]);

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3" ref={timeRef}>
          {activeTask ? timeFormatter(activeTask.duration) : "00:00"}
        </Typography>
        <Typography variant="h6">
          {activeTask ? activeTask.name : "No Task Yet"}
        </Typography>

        {active ? (
          <IconButton size="small" onClick={stopTimer}>
            <PauseIcon className={classes.icons} />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={startTimer}>
            <PlayIcon className={classes.icons} />
          </IconButton>
        )}
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
    color: theme.palette.secondary.main,
  },
}));

export default Timer;
