import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../../features/auth/currentUserSlice";
import nameSplicer from "../utils/nameSplicer";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const currentUser = useSelector((state) => state.currentUser);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = (e) => setAnchorEl(null);

  const handleLogout = async (e) => {
    try {
      await axios.get("/api/auth/logout");

      dispatch(clearCurrentUser());
    } catch (err) {
      console.log(err);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.logoContainer}>
            <Typography variant="h5" className={classes.projectName} component={Link} to="/">
              aloeviate.
            </Typography>
          </div>

          <div>
            <Avatar className={classes.avatar} onClick={handleMenu}>
              {currentUser.data !== "" ? (
                nameSplicer(currentUser.data.username)
              ) : (
                <AccountIcon className={classes.accountIcon} />
              )}
            </Avatar>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              {!currentUser ? (
                <div>
                  <MenuItem onClick={handleClose} component={Link} to="/register">
                    Register
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/login">
                    Login
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleClose} component={Link} to="/">
                    Tasks
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </div>
              )}
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
  logoContainer: {
    flex: "1",
  },
  projectName: {
    letterSpacing: "0.2rem",

    textDecoration: "none",
    color: "#000",
  },
  avatar: {
    color: theme.palette.secondary.main,
    background: "#fff",
  },
  avatarName: {},
  accountIcon: {
    fontSize: "3rem",
    fill: theme.palette.secondary.main,
    background: "#fff",
  },
}));

export default Header;
