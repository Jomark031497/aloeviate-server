import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/layouts/Header";
import { getTasks } from "./features/tasks/getTasksSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import TaskContainer from "./components/tasks/TasksContainer";

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
      <Router>
        <Header />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route path="/">
            <TaskContainer tasks={tasks} hotdog="hotdog" />
          </Route>
        </Switch>
      </Router>
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
