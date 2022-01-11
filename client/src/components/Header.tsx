import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box id="title-container" sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ letterSpacing: "0.3rem" }}>
              aloeviate.
            </Typography>
          </Box>

          <Box id="auth-container" sx={{ display: "flex" }}>
            <IconButton>
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ minHeight: 65 }} />
    </>
  );
};
export default Header;
