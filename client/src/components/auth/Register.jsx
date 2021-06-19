import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { registerUser } from "../../features/auth/registerUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useHistory, Redirect } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Alert } from "@material-ui/lab";

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleHidePassword = () => setShowPassword(!showPassword);

  const currentUser = useSelector((state) => state.currentUser.data);

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password.length < 6) {
      console.log("wow");
      setError("Password should exceed 6 characters");
      return;
    }

    dispatch(registerUser(user))
      .then(unwrapResult)
      .then((result) => {
        console.log("redirecting");
        <Redirect to="/" />;
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        if (err.name === "Error") {
          setError("Username already exists, please pick another username");
        }
        setUser({ ...user, password: "" });
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
          required
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
