import { AppBar, Box, Toolbar, Link } from "@mui/material";
import NextLink from "next/link";

const Header: React.FC = () => {
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
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: { xs: 59, md: 65 } }} />
    </>
  );
};
export default Header;
