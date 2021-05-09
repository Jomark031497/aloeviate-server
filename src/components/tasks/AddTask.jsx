import { Button, Card, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addTask } from "../../features/tasks/taskSlice";
import timeParser from "../../utils/timeParser";

const AddTask = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    name: "",
    duration: "",
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTask({ ...task, id: v4(), duration: timeParser(task.duration) })
    );
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
          <Typography variant="h6">Add Task</Typography>
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0.5rem auto",
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
    border: "2px dashed black",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
    cursor: "pointer",
  },
}));

export default AddTask;
