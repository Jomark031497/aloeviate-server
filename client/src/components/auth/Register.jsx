import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

const Register = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
  };
  return (
    <div className={classes.root}>
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        <TextField
          variant="outlined"
          label="Username"
          size="small"
          className={classes.textfields}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Password"
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
    background: "#cdcd",
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
