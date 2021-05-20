import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import TaskContextProvider from "./context/TaskContext";

const theme = createMuiTheme({
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

ReactDOM.render(
  <React.StrictMode>
    <TaskContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </TaskContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
