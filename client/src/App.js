import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setCurrentUser } from "./features/auth/currentUserSlice";
import Header from "./components/layouts/Header";
import Register from "./components/auth/Register";
import TaskContainer from "./components/tasks/TasksContainer";
import Login from "./components/auth/Login";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await axios.get("/api/auth/me", { withCredentials: true });
        dispatch(setCurrentUser(data));
      } catch (err) {
        console.log(err.message);
      }
    };

    checkLogin();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/">{currentUser.data ? <TaskContainer /> : <Redirect to="/login" />}</Route>
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
