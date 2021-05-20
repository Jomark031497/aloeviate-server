import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import ArrowUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

import { timeFormatter } from "../../utils/timeParser";

const TaskCard = ({ task }) => {
  const classes = useStyles();

  const { dispatch } = useContext(TaskContext);

  const handleRemove = () => {
    dispatch({ type: "REMOVE_TASK", payload: { id: task.id } });
  };

  const handleComplete = () => {
    if (task.isCompleted) return;
    console.log("completing task");
    dispatch({ type: "COMPLETE_TASK", payload: { id: task.id } });
  };

  const handleReset = () => {
    if (!task.isCompleted) return;
    console.log("resetting task");
    dispatch({ type: "RESET_TASK", payload: { id: task.id } });
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.CardContent}>
        <Box className={classes.remainingDuration}>
          <Typography variant="subtitle1">
            {timeFormatter(task.elapsedTime)}
          </Typography>
        </Box>
        <Box className={classes.taskNameContainer}>
          <Typography
            variant="subtitle2"
            className={classes.taskName}
            color={task.isCompleted ? "textSecondary" : "textPrimary"}
            style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
          >
            {task.name}
          </Typography>

          <Box className={classes.sortingArrows}>
            <IconButton size="small">
              <ArrowUpIcon />
            </IconButton>
            <IconButton size="small">
              <ArrowDownIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="secondary"
          className={classes.deleteBtn}
          onClick={handleRemove}
        >
          Delete
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.resetBtn}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          size="small"
          disabled={task.isCompleted}
          className={classes.completeBtn}
          onClick={handleComplete}
        >
          Complete
        </Button>
        <Typography>{timeFormatter(task.duration)}</Typography>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 1rem",
  },
  rootNot: {
    margin: "1rem 1rem",
    background: "grey",
  },
  CardContent: {
    display: "flex",
    padding: "0",
  },
  cardActions: {
    background: "#efefef",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  remainingDuration: {
    background: "#ddd",
    display: "flex",
    alignItems: "center",
    padding: "0rem 1rem",
  },
  taskNameContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 0.5rem",
  },
  taskName: {
    fontWeight: "bolder",
    flex: "1",
  },
  sortingArrows: {
    display: " flex",
    flexDirection: "column",
  },
  resetBtn: {
    fontSize: "0.8rem",
    fontWeight: "bolder",
  },
  completeBtn: {
    fontSize: "0.8rem",
    fontWeight: "bolder",
    color: theme.palette.success.main,
  },
  deleteBtn: {
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
}));

export default TaskCard;
