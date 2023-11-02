import { useEffect, type ReactElement, type ReactNode, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { type AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, type EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { baselightTheme } from "../src/theme/DefaultColors";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter, Router } from "next/router";

import NProgress from "nprogress";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = baselightTheme;

  const getLayout = Component.getLayout ?? (page => page);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = router.pathname?.startsWith("/auth");
      const token = localStorage.getItem("authToken");
      const expiration = localStorage.getItem("tokenExpiration");

      let isTokenExpired = false;
      if (expiration) {
        const currentTime = new Date();
        const expirationTime = new Date(expiration);
        isTokenExpired = currentTime > expirationTime;
      }

      if (isTokenExpired) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("pages");
        localStorage.removeItem("currentPage");
        localStorage.removeItem("tokenExpiration");
      }

      if (!isAuth && (!token || isTokenExpired)) {
        router.push("/authentication/login").finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router.pathname]);


  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Smartdash</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading
          ? (
            <div
              style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CircularProgress size={24} color="inherit" />
            </div>
          )
          : (
            getLayout(<Component {...pageProps} />)
          )}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
