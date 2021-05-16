import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import { useSelector } from "react-redux";
import { timeFormatter } from "../../utils/timeParser";

const Timer = () => {
  const classes = useStyles();

  const tasks = useSelector((state) => state.tasks);

  return (
    <div>
      {tasks.length ? (
        <div className={classes.root}>
          <Typography variant="h3">
            {timeFormatter(tasks[0].duration)}
          </Typography>
          <Typography variant="h6">{tasks[0].name}</Typography>

          <IconButton size="small">
            <PlayIcon className={classes.icons} />
          </IconButton>
        </div>
      ) : (
        <div className={classes.root}>
          <Typography variant="h3">00:00</Typography>
          <Typography variant="h6">No Task Found</Typography>
        </div>
      )}
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
