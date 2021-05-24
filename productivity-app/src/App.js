import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import Header from "./components/layouts/Header";
import TaskContainer from "./components/tasks/TaskContainer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  GET_TASKS_ERROR,
  GET_TASKS_LOADING,
  GET_TASKS_SUCCESS,
} from "./features/tasks/tasksSlice";

function App() {
  const classes = useStyles();

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTasks = async () => {
      try {
        dispatch(GET_TASKS_LOADING());
        const { data } = await axios.get("/tasks");
        dispatch(GET_TASKS_SUCCESS(data));
      } catch (err) {
        dispatch(GET_TASKS_ERROR(err));
      }
    };

    getTasks();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.mainContainer}>
        {/* <Timer /> */}
        {tasks.error ? (
          <p>There was an error</p>
        ) : tasks.isLoading ? (
          <p>loading...</p>
        ) : (
          <TaskContainer />
        )}
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
