import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";

const Timer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3">05:00</Typography>
      <Typography variant="subtitle1">My First Task</Typography>

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
