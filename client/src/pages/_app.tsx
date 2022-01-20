import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "../lib/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import theme from "../styles/theme";
import Layout from "../components/Layout";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import axios from "axios";

// for serverside MUI
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL + "/api";
axios.defaults.withCredentials = true;

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <title>aloeviate</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CacheProvider value={emotionCache}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CacheProvider>
          </ThemeProvider>
        </ReduxProvider>
      </>
    </>
  );
}

export default MyApp;
