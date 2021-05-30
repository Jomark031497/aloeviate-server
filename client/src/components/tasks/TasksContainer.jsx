import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Timer from "../timer/Timer";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

const TasksContainer = ({ tasks }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
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
  root: {
    width: "375px",
    margin: "auto",
    background: "#efefef",
    minHeight: "100vh",
  },
  mainContainer: {
    padding: "0rem 1rem",
  },
}));
export default TasksContainer;
