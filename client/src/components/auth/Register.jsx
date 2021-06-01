import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { registerUser } from "../../features/auth/registerUserSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(registerUser(user))
      .then(unwrapResult)
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h4">Register</Typography>
        <TextField
          variant="filled"
          label="Username"
          size="small"
          className={classes.textfields}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          variant="filled"
          label="Password"
          type="password"
          size="small"
          className={classes.textfields}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button variant="outlined" className={classes.buttons} type="submit">
          Register
        </Button>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textfields: {
    margin: "0.5rem auto",
  },
  buttons: {
    margin: "0.5rem auto",
  },
}));

export default Register;
