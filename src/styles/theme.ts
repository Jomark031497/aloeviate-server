import { createTheme } from "@mui/material";
let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    primary: {
      light: "#85cdca",
      main: "#41B3A3",
    },
    secondary: {
      main: "#E27D60",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

export default theme;
