import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import { TaskContext } from "../../context/TaskContext";
import { useContext, useEffect, useRef, useState } from "react";
import { timeFormatter, timeToSecs } from "../../utils/timeParser";
import useSound from "use-sound";
import dingSound from "../../assets/ding.mp3";
import backgroundSound from "../../assets/DoIWannaKnow.mp3";

const Timer = () => {
  const classes = useStyles();
  const { tasks, dispatch } = useContext(TaskContext);

  const [active, setActive] = useState(false);
  const [activeTask, setActiveTask] = useState("");
  const timeRef = useRef();

  const [ding] = useSound(dingSound);
  const [background, { stop, isPlaying, pause }] = useSound(backgroundSound, {
    volume: 0.25,
    loop: true,
  });

  const startTimer = (e) => {
    // button won't work if there are no tasks
    if (!tasks.length) return;

    // fetch all tasks that are not completed yet
    const filteredTasks = tasks.filter((task) => !task.isCompleted);

    // if there are no tasks left, return
    if (!filteredTasks.length) return;

    // set the active state to true
    setActive((prev) => !prev);

    // set the activeTask to the first task in the context
    if (activeTask === "") setActiveTask(filteredTasks[0]);
  };

  const stopTimer = (e) => {
    // toggle the active state
    setActive((prev) => !prev);
    if (isPlaying) {
      pause();
    }
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
    // so that when you delete/complete a task, it will not continue the countdown
    if (!tasks.length || activeTask.isCompleted) {
      stop();
      setActive(false);
      setActiveTask("");
    }
    // interval id
    let countdown;

    // button state if it is active (play)
    if (active) {
      background();
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
          setActiveTask("");
          // play the ding audio
          ding();
          stop();
        }

        duration -= 1;
        timeRef.current.innerHTML = timeFormatter(duration);
      }, 1000);
    }

    // cleanup
    return () => {
      clearInterval(countdown);
    };
  }, [active, activeTask, dispatch, tasks, ding, background, stop]);

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3" ref={timeRef}>
          {activeTask ? timeFormatter(activeTask.duration) : "00:00"}
        </Typography>
        <Typography variant="h6" className={classes.activeTaskName}>
          {activeTask ? activeTask.name : "No Task Yet"}
        </Typography>

        {active ? (
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
  activeTaskName: {
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
