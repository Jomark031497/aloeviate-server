import { makeStyles } from "@material-ui/styles";
import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <TaskContainer />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    height: "100vh",
  },
}));

export default App;
