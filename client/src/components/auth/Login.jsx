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

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleHidePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password) return;

    // while this one always returns Error: request failed with a status code 400
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      dispatch(setCurrentUser(data));
    } catch (err) {
      console.log(err);
    }
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
                  onMouseUp={handleShowPassword}
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
