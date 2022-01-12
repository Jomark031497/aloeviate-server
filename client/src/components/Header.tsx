import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { setCurrentUser } from "../redux/features/auth/loginSlice";
import { useRouter } from "next/router";
import CLink from "./custom/CLink";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("auth/me", { withCredentials: true });
        dispatch(setCurrentUser(data));
      } catch (error) {
        console.error(error);
      }
    };

    checkAuth();
  }, [dispatch]);

  const logoutUser = async () => {
    try {
      await axios.get("auth/logout", { withCredentials: true });
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box id="title-container" sx={{ flex: 1 }}>
            <CLink href="/" label="aloeviate." variant="h5" color="textPrimary" sx={{ letterSpacing: "0.3rem" }} />
          </Box>

          <Box id="auth-container" sx={{ display: "flex" }}>
            {user ? (
              <IconButton onClick={logoutUser}>
                <MenuIcon sx={{ color: "#fff" }} />
              </IconButton>
            ) : (
              <>
                <Button onClick={() => router.push("/login")} sx={{ mx: "0.5rem", color: "text.primary" }}>
                  Login
                </Button>
                <Button onClick={() => router.push("/register")} sx={{ mx: "0.5rem", color: "text.primary" }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ minHeight: { xs: 59, md: 65 } }} />
    </>
  );
};
export default Header;
