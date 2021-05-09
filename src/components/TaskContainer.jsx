import { makeStyles } from "@material-ui/core";
import React from "react";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

const TaskContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TaskCard />
      <AddTask />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
}));

export default TaskContainer;
