import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import TaskContextProvider from "./context/TaskContext";

const theme = createMuiTheme({});

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
