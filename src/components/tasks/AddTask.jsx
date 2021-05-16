import { Button, Card, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";

const AddTask = () => {
  const classes = useStyles();

  const { dispatch } = useContext(TaskContext);

  const [task, setTask] = useState({
    name: "",
    duration: 0,
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TASK",
      payload: { name: task.name, duration: parseInt(task.duration) * 60 },
    });
    closeAddTask();
  };

  const closeAddTask = (e) => {
    setTask({ name: "", duration: "" });
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <Card component="form" onSubmit={handleSubmit} className={classes.card}>
          <div className={classes.cardContent}>
            <TextField
              label="Task Name"
              size="small"
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
            <div>
              <Button size="small" variant="outlined" type="submit">
                Add
              </Button>
              <Button size="small" variant="outlined" onClick={closeAddTask}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className={classes.addTaskCard} onClick={(e) => setOpen(true)}>
          <Typography variant="h6" color="textSecondary">
            Add Task
          </Typography>
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
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
  addTaskCard: {
    margin: "0.5rem 0.9rem",
    border: "1px dashed black",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
    cursor: "pointer",
  },
}));

export default AddTask;
