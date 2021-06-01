import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Timer from "../timer/Timer";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../../features/tasks/getTasksSlice";

const TasksContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.getTasks);
  const { addTask, deleteTask, updateTask, currentUser } = useSelector(
    (state) => state
  );

  useEffect(() => {
    try {
      dispatch(getTasks({ id: currentUser.data._id }));
    } catch (err) {
      console.log(err.message);
    }
  }, [
    dispatch,
    addTask.data,
    deleteTask.data,
    updateTask.data,
    currentUser.data,
  ]);

  return (
    <div className={classes.mainContainer}>
      {/* <Timer /> */}
      {tasks && tasks.status === "success"
        ? tasks.data.tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))
        : null}

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
