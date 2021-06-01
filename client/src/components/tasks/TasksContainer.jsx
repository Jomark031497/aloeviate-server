import { makeStyles } from "@material-ui/styles";
import Timer from "../timer/Timer";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useSelector } from "react-redux";

const TasksContainer = () => {
  const classes = useStyles();

  const tasks = useSelector((state) => state.currentUser.data.tasks);

  return (
    <div className={classes.mainContainer}>
      {/* <Timer /> */}
      {tasks && tasks.map((task) => <TaskCard task={task} key={task._id} />)}

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
