import { Button, Card, TextField } from "@material-ui/core";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTask({ ...task, id: v4(), duration: timeParser(task.duration) })
    );

    setTask({ name: "", duration: "" });
  };

  return (
    <Card component="form" onSubmit={handleSubmit} className={classes.root}>
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

        <Button size="small" variant="outlined" type="submit">
          Add
        </Button>
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

export default AddTask;
