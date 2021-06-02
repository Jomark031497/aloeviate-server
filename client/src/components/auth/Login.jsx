import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { loginUser } from "../../features/auth/loginUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { setCurrentUser } from "../../features/auth/currentUserSlice";
import { Link, useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const [current, setCurrent] = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleHidePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password) return;
    dispatch(loginUser(user))
      .then(unwrapResult)
      .then((result) => {
        setCurrent(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    dispatch(setCurrentUser(current));
    if (current) history.push("/");
  }, [current, dispatch, history]);

  return (
    <div className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h4">Login</Typography>
        <TextField
          variant="outlined"
          label="Username"
          size="small"
          fullWidth
          className={classes.textfields}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          size="small"
          fullWidth
          className={classes.textfields}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  size="small"
                  onClick={handleShowPassword}
                  onMouseDown={handleHidePassword}
                  onMouseUp={handleHidePassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.buttons}
          type="submit"
        >
          Log In
        </Button>

        <Link to="/register">Register to aloeviate</Link>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3rem 2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textfields: {
    margin: "1rem auto",
  },
  buttons: {
    margin: "0.5rem auto 1.5rem auto",
  },
}));

export default Login;
