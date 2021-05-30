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
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../../features/auth/currentUserSlice";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const currentUser = useSelector((state) => state.currentUser.data);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = (e) => setAnchorEl(null);

  const handleLogout = async (e) => {
    try {
      const res = await axios.get("/users/logout");
      console.log(res.data);

      dispatch(clearCurrentUser());
    } catch (err) {
      console.log(err);
    } finally {
      handleClose();
    }
  };

  const nameSplicer = (name) => {
    return name.charAt(0).toUpperCase();
  };
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" className={classes.projectName}>
            aloeviate.
          </Typography>

          <div>
            <Avatar className={classes.avatar} onClick={handleMenu}>
              {currentUser ? (
                nameSplicer(currentUser.username)
              ) : (
                <AccountIcon />
              )}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!currentUser ? (
                <div>
                  <MenuItem onClick={handleClose} component={Link} to="/">
                    Tasks
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/register"
                  >
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
  projectName: {
    letterSpacing: "0.2rem",
    flex: "1",
  },
  avatar: {
    color: theme.palette.secondary.main,
  },
}));

export default Header;
