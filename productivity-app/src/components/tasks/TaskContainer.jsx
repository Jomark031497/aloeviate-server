import { makeStyles } from "@material-ui/styles";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import Timer from "../timer/Timer";

import { CircularProgress } from "@material-ui/core";

const TaskContainer = ({ tasks }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Timer />
      {!tasks.error && tasks.isLoading ? (
        <CircularProgress />
      ) : (
        tasks.data.map((task) => <TaskCard task={task} key={task._id} />)
      )}
      <AddTask />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default TaskContainer;
