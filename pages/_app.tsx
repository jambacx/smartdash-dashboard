import { useEffect, type ReactElement, type ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';
import type { NextPage } from 'next';
import Head from 'next/head';
import { type AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { baselightTheme } from '../src/theme/DefaultColors';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { WrapperProvider } from '@src/contexts/wrapper.context';

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

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const cookies = nookies.get();
      const token = cookies?.authToken;

      if (!token && !url.startsWith('/authentication')) {
        router.push('/authentication/login');
      }
    };

    handleRouteChange(router.pathname);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Smartdash</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Toaster />
        <CssBaseline />
        <WrapperProvider>
          {getLayout(<Component {...pageProps} />)}
        </WrapperProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
