import { makeStyles } from "@material-ui/core";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";

const TaskContainer = () => {
  const classes = useStyles();

  const tasks = useSelector((state) => state.tasks);
  return (
    <div className={classes.root}>
      {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      <AddTask />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default TaskContainer;
