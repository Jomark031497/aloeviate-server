import { makeStyles } from "@material-ui/core";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";

const TaskContainer = () => {
  const classes = useStyles();

  const tasks = useSelector((state) => state.tasks);

  console.log(tasks);
  return (
    <div className={classes.root}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      <AddTask />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
}));

export default TaskContainer;
