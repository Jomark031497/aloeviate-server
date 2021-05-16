import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { timeFormatter } from "../../utils/timeParser";

const Timer = () => {
  const classes = useStyles();

  // fetches all tasks available in the state
  const tasks = useSelector((state) => state.tasks);
  const [active, setActive] = useState(false);

  const [activeTask, setActiveTask] = useState({
    id: v4(),
    name: "no task yet",
    duration: 0,
  });

  // The countdown timer will now start
  const startTimer = (e) => {
    if (!tasks.length) return;
    setActive((prev) => !prev);
    console.log("timer starts now!");
    setActiveTask(tasks[0]);
  };

  const stopTimer = (e) => {
    setActive((prev) => !prev);
  };

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3">
          {timeFormatter(activeTask.duration)}
        </Typography>
        <Typography variant="h6">{activeTask.name}</Typography>

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
  },
}));

export default Timer;
