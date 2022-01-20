import { AppBar, Box, Toolbar, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { logoutUser } from "../redux/features/auth/loginSlice";
import { RootState, useAppDispatch } from "../redux/store";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user } = useSelector((state: RootState) => state.login);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
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
            <NextLink href="/" passHref>
              <Link variant="h5" underline="none" sx={{ color: "#fff", letterSpacing: "0.3rem" }}>
                aloeviate.
              </Link>
            </NextLink>
          </Box>

          <Box id="auth-container" sx={{ display: "flex" }}>
            {user ? (
              <Box onClick={handleLogout}>
                <Typography variant="subtitle1">{user.username}</Typography>
              </Box>
            ) : (
              <>
                <NextLink href="/login" passHref>
                  <Link variant="h6" underline="none" sx={{ color: "#fff", mx: "1rem" }}>
                    login
                  </Link>
                </NextLink>
                <NextLink href="/register" passHref>
                  <Link variant="h6" underline="none" sx={{ color: "#fff", mx: "1rem" }}>
                    register
                  </Link>
                </NextLink>
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
