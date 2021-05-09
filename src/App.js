import { makeStyles } from "@material-ui/styles";
import Header from "./components/layouts/Header";
import TaskContainer from "./components/tasks/TaskContainer";
import Timer from "./components/timer/Timer";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.mainContainer}>
        <Timer />
        <TaskContainer />
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
