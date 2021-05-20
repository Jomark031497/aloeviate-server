import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

const TaskContainer = () => {
  const classes = useStyles();

  const { tasks } = useContext(TaskContext);

  return (
    <div className={classes.root}>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
      <AddTask />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default TaskContainer;
