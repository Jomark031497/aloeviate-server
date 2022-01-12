import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "../lib/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import theme from "../styles/theme";
import Layout from "../components/Layout";

// for serverside MUI
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <Head>
        <title>leddit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <>
        <ThemeProvider theme={theme}>
          <CacheProvider value={emotionCache}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CacheProvider>
        </ThemeProvider>
      </>
    </>
  );
}

export default MyApp;