import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/layouts/Header";
import TaskContainer from "./components/tasks/TaskContainer";
import { getTasks } from "./features/tasks/getTasksSlice";

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.getTasks);
  const addTask = useSelector((state) => state.addTask);
  const deleteTask = useSelector((state) => state.deleteTask);
  const updateTask = useSelector((state) => state.updateTask);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, addTask.data, deleteTask.data, updateTask.data]);

  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.mainContainer}>
        <TaskContainer tasks={tasks} />
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
