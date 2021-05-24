import { Button, Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/addTaskSlice";

const AddTask = () => {
  const classes = useStyles();

  const [task, setTask] = useState({
    name: "",
    duration: 0,
    elapsedTime: 0,
    isCompleted: false,
  });

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.name === "") return;

    dispatch(addTask(task));

    closeAddTask();
  };

  const closeAddTask = (e) => {
    setTask({ name: "", duration: "" });
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {open ? (
        <Card component="form" onSubmit={handleSubmit} className={classes.card}>
          <div className={classes.cardContent}>
            <TextField
              label="Task Name"
              size="small"
              autoFocus={true}
              className={classes.textfields}
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
            />
            <TextField
              label="Duration"
              type="number"
              size="small"
              className={classes.textfields}
              value={task.duration}
              onChange={(e) => setTask({ ...task, duration: e.target.value })}
            />
            <div className={classes.buttons}>
              <Button
                size="small"
                variant="outlined"
                className={classes.button}
                type="submit"
              >
                Add
              </Button>
              <Button
                size="small"
                variant="outlined"
                className={classes.button}
                onClick={closeAddTask}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          size="large"
          className={classes.addTask}
          onClick={(e) => setOpen(true)}
        >
          Add Task
        </Button>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    margin: "0.5rem 1rem",
    background: "rgba(255,255,255, 0.5)",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 0rem",
  },
  addTask: {
    margin: "0.5rem 1rem",
    padding: "1rem",
  },
  buttons: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "0.5rem 0.5rem 0 0.5rem",
  },
}));

export default AddTask;
