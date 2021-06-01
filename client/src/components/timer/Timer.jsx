import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeFormatter, timeToSecs } from "../../utils/timeParser";
import { updateTask } from "../../features/tasks/updateTaskSlice";

const Timer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.getTasks);

  const [timerActive, setTimerActive] = useState(false);
  const [activeTask, setActiveTask] = useState("");
  const timeRef = useRef();
  const taskNameRef = useRef();

  const startTimer = (e) => {
    // return if there are no tasks at all
    if (!tasks.length) return;

    // get the first incomplete task
    const task = getFirstTask();

    // return if all tasks are completed
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
    const elapsedTime =
      activeTask.duration - timeToSecs(timeRef.current.innerHTML);

    dispatch(updateTask({ ...activeTask, elapsedTime }));

    // stop/pause the timer
    setTimerActive(false);
  };

  useEffect(() => {
    // interval id
    let countdown;

    // get the id of the current task
    const filterTask = tasks.data.tasks.filter(
      (task) => activeTask._id === task._id
    );

    // Since the when you reset the task, it will set all the durations to default (ie elapsed time to zero)
    // this code will run, which will remove the bug where when you reset the task, it will use the duration - elapsedTime
    if (filterTask.length && filterTask[0].elapsedTime === 0) {
      timeRef.current.innerHTML = timeFormatter(filterTask[0].duration);
      taskNameRef.current.innerHTML = filterTask[0].name;
      setActiveTask(filterTask[0]);
    }

    // if task is completed, wil lreset the timer and stop
    if (!tasks.length || (filterTask.length && filterTask[0].isCompleted)) {
      clearInterval(countdown);
      resetTimerRefs();
      setTimerActive(false);
      setActiveTask("");
    }

    // if the timer is in active mode
    if (timerActive && activeTask) {
      // set the duration to the duration of the active task - the elapsed time
      let duration = activeTask.duration - activeTask.elapsedTime;

      countdown = setInterval(() => {
        // clear the interval and stop the clock if it reaches zero
        if (duration <= 1) {
          clearInterval(countdown);
          setTimerActive(false);
          resetTimerRefs();
          setActiveTask("");
          dispatch(
            updateTask({ ...activeTask, isCompleted: true, elapsedTime: 0 })
          );
        }
        duration -= 1;
        timeRef.current.innerHTML = timeFormatter(duration);
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timerActive, activeTask, tasks, dispatch]);

  const getFirstTask = () => {
    // check if there are tasks
    if (!tasks.length) return;

    // get all the incomplete tasks
    const filterIncompleteTasks = tasks.filter((task) => !task.isCompleted);

    // check if there are filtered tasks
    if (!filterIncompleteTasks.length) return;

    return filterIncompleteTasks[0];
  };

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
