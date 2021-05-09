import { Card, CardContent, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const AddTask = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <TextField
          label="Task Name"
          size="small"
          className={classes.textfields}
        />
        <TextField
          label="Duration"
          type="number"
          size="small"
          className={classes.textfields}
        />
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.5rem auto",
    background: "rgba(255,255,255, 0.5)",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
}));

export default AddTask;
