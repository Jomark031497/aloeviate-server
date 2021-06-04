import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { registerUser } from "../../features/auth/registerUserSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleHidePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {}

    dispatch(registerUser(user))
      .then(unwrapResult)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h4">Register</Typography>

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
          label="Password"
          type={showPassword ? "text" : "password"}
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
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="outlined" className={classes.buttons} type="submit">
          Register
        </Button>

        <Link to="/login">Already have an account? Sign in </Link>
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

export default Register;
