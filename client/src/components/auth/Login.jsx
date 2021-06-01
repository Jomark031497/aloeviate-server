import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { loginUser } from "../../features/auth/loginUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { setCurrentUser } from "../../features/auth/currentUserSlice";
import { useHistory } from "react-router-dom";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const currentUser = useSelector((state) => state.currentUser.data);

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(user))
      .then(unwrapResult)
      .then((result) => {
        dispatch(setCurrentUser(result));
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h4">Login</Typography>
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
          size="small"
          className={classes.textfields}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button variant="outlined" className={classes.buttons} type="submit">
          Login
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

export default Login;
