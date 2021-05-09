import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
  const classes = useStyles();

  const tasks = useSelector((state) => state.tasks);

  const [activeTask, setActiveTask] = useState({});

  useEffect(() => {
    tasks.length === 0
      ? setActiveTask({
          name: "No Task Yet",
          duration: "00:00",
        })
      : setActiveTask(tasks[0]);
  }, [tasks]);

  return (
    <div className={classes.root}>
      <Typography variant="h3">{activeTask.duration}</Typography>
      <Typography variant="subtitle1">{activeTask.name}</Typography>

      <div>
        <IconButton disableRipple disableFocusRipple size="small">
          <Typography>-5</Typography>
        </IconButton>
        <IconButton size="small">
          <PlayIcon className={classes.icons} />
        </IconButton>
        <IconButton disableRipple disableFocusRipple size="small">
          <Typography>+5</Typography>
        </IconButton>
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
