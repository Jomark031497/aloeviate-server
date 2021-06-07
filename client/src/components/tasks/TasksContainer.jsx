import { makeStyles } from "@material-ui/styles";
import Timer from "../timer/Timer";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "../../features/auth/currentUserSlice";

const TasksContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser, addTask, updateTask, deleteTask } = useSelector(
    (state) => state
  );

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        dispatch(setCurrentUser(data));
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentUser();
  }, [dispatch, addTask.data, updateTask.data, deleteTask.data]);

  return (
    <div className={classes.mainContainer}>
      <Timer />
      {currentUser.data.tasks &&
        currentUser.data.tasks.map((task) => (
          <TaskCard task={task} key={task._id} userID={currentUser.data._id} />
        ))}

      <AddTask userId={currentUser.data._id} />
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
