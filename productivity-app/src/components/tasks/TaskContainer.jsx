import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

const TaskContainer = () => {
  const classes = useStyles();

  const tasks = useSelector((state) => state.tasks.data);

  console.log(tasks);

  return (
    <div className={classes.root}>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
      <AddTask />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default TaskContainer;
