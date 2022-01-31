import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { unstable_createMuiStrictModeTheme as createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import store from "./app/store";
import { Provider as ReduxProvider } from "react-redux";
import axios from "axios";

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

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
