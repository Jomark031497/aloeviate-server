import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" className={classes.projectName}>
            aloeviate.
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.offset} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  projectName: {
    letterSpacing: "0.2rem",
  },
}));

export default Header;
