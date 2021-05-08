import {
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
      <div>
        <Typography variant="h5">05:00</Typography>
      </div>
      <div>
        <CardContent>
          <Typography variant="subtitle1">Task Name</Typography>
        </CardContent>

        <CardActions>
          <Button size="small" className={classes.buttons}>
            delete
          </Button>
          <Button size="small" className={classes.buttons}>
            reset
          </Button>
          <Button size="small" className={classes.buttons}>
            complete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 1.5rem",
    display: "flex",
    alignItems: "center",
  },
  buttons: {
    width: "40px",
    fontSize: "0.5rem",
    textTransform: "capitalize",
  },
}));

export default TaskCard;
