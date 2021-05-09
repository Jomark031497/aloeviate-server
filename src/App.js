import { makeStyles } from "@material-ui/styles";
import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.mainContainer}>
        <TaskContainer />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "375px",
    margin: "auto",
    background: "#cecece",
    minHeight: "100vh",
  },
}));

export default App;
