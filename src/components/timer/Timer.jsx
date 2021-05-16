import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import { TaskContext } from "../../context/TaskContext";
import { useContext, useState } from "react";
import { timeFormatter } from "../../utils/timeParser";

const Timer = () => {
  const classes = useStyles();

  const [active, setActive] = useState(false);
  const { tasks } = useContext(TaskContext);

  // The countdown timer will now start
  const startTimer = (e) => {
    if (!tasks.length) return;
    setActive((prev) => !prev);
  };

  const stopTimer = (e) => {
    setActive((prev) => !prev);
  };

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3">
          {tasks.length ? timeFormatter(tasks[0].duration) : "00:00"}
        </Typography>
        <Typography variant="h6">
          {tasks.length ? tasks[0].name : "No Task Yet"}
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
  },
}));

export default Timer;
