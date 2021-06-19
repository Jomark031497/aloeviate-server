import { makeStyles } from "@material-ui/styles";
import Timer from "../timer/Timer";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "../../features/auth/currentUserSlice";
import { Box } from "@material-ui/core";

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

  const getCompletedTasks = () =>
    currentUser.data.tasks.filter((task) => task.isCompleted);

  const getIncompleteTasks = () =>
    currentUser.data.tasks.filter((task) => !task.isCompleted);

  return (
    <div className={classes.mainContainer}>
      <Timer />
      {currentUser.data.tasks &&
        getIncompleteTasks().map((task) => (
          <div key={task._id}>
            <TaskCard task={task} userID={currentUser.data._id} />
          </div>
        ))}

      <Box className={classes.completedContainer}>
        {currentUser.data.tasks &&
          getCompletedTasks().map((task) => (
            <div key={task._id}>
              <TaskCard task={task} userID={currentUser.data._id} />
            </div>
          ))}
      </Box>

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
  completedTitle: {
    margin: "auto 1rem",
    textAlign: "center",
  },
}));
export default TasksContainer;
