import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

const Header = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = (e) => setAnchorEl(null);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" className={classes.projectName}>
            aloeviate.
          </Typography>

          <div>
            <Avatar className={classes.avatar} onClick={handleMenu}>
              <AccountIcon />
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/register">
                Register
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/">
                Tasks
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/login">
                Login
              </MenuItem>
            </Menu>
          </div>
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
    flex: "1",
  },
  avatar: {
    color: theme.palette.secondary.main,
  },
}));

export default Header;
