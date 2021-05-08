import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const TaskCard = ({ task }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.CardContent}>
        <Box className={classes.remainingDuration}>
          <Typography variant="h6">05:00</Typography>
        </Box>
        <Box className={classes.taskName}>
          <Typography variant="h6">My First Task</Typography>
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="outlined" size="small">
          Delete
        </Button>
        <Button variant="outlined" size="small">
          Reset
        </Button>
        <Button variant="outlined" size="small">
          Complete
        </Button>
        <Typography>05:00</Typography>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 1.5rem",
    minWidth: "490px",
  },
  CardContent: {
    display: "flex",
    padding: "0",
  },
  cardActions: {
    background: "#efefef",
    paddingLeft: "5.5rem",
    paddingRight: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  remainingDuration: {
    background: "#ddd",
    padding: "1rem",
  },
  taskName: {
    padding: "1rem",
  },
}));

export default TaskCard;
