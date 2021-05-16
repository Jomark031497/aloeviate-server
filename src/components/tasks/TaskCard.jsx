import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

import { timeFormatter } from "../../utils/timeParser";

const TaskCard = ({ task }) => {
  const classes = useStyles();

  const { dispatch } = useContext(TaskContext);

  const handleRemove = () =>
    dispatch({ type: "REMOVE_TASK", payload: { id: task.id } });

  const handleComplete = () =>
    dispatch({ type: "COMPLETE_TASK", payload: { id: task.id } });

  const handleReset = () =>
    dispatch({ type: "RESET_TASK", payload: { id: task.id } });

  return (
    <Card
      className={classes.root}
      style={{ background: task.isCompleted ? "green" : "red" }}
    >
      <CardContent className={classes.CardContent}>
        <Box className={classes.remainingDuration}>
          <Typography variant="h6">{timeFormatter(task.duration)}</Typography>
        </Box>
        <Box className={classes.taskName}>
          <Typography variant="subtitle1">{task.name}</Typography>
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="outlined"
          size="small"
          className={classes.buttons}
          onClick={handleRemove}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.buttons}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.buttons}
          onClick={handleComplete}
        >
          Complete
        </Button>
        <Typography>REM</Typography>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem auto",
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
  taskName: {
    padding: "1rem 0.5rem",
  },
  buttons: {
    fontSize: "0.7rem",
  },
}));

export default TaskCard;
