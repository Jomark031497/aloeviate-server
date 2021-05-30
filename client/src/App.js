import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/layouts/Header";
import AddTask from "./components/tasks/AddTask";
import TaskCard from "./components/tasks/TaskCard";
import Timer from "./components/timer/Timer";
import { getTasks } from "./features/tasks/getTasksSlice";

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.getTasks);
  const { addTask, deleteTask, updateTask } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, addTask.data, deleteTask.data, updateTask.data]);

  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.mainContainer}>
        <Timer />
        {!tasks.error && tasks.isLoading ? (
          <CircularProgress />
        ) : (
          tasks.data.map((task) => <TaskCard task={task} key={task._id} />)
        )}
        <AddTask />
      </div>
    </div>
  );
}

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

export default App;
