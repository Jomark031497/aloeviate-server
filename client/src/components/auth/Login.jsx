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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/auth/currentUserSlice";
import { Link, useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { loginUser } from "../../features/auth/loginUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Alert } from "@material-ui/lab";

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

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleHidePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password) return;

    dispatch(loginUser(user))
      .then(unwrapResult)
      .then((res) => {
        dispatch(setCurrentUser(res));
        setError("");
      })
      .catch((err) => {
        if (err.name === "Error") {
          setError("Wrong username or password");
        }
      });
  };

  return (
    <div className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h4">Login</Typography>
        <TextField
          variant="outlined"
          label="Username"
          size="small"
          fullWidth
          required
          className={classes.textfields}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <TextField
          variant="outlined"
          type={showPassword ? "text" : "password"}
          label="Password"
          size="small"
          fullWidth
          required
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

        {error ? (
          <Alert
            severity="error"
            variant="outlined"
            onClose={() => {
              setError("");
            }}
          >
            <Typography variant="body2" className={classes.errorText}>
              {error}
            </Typography>
          </Alert>
        ) : null}
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
  errorText: {
    fontSize: "0.7rem",
  },
}));

export default Login;
