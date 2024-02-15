import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Layout } from '@/components';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { StatusProvider } from '@/context/statusContext';
import LoadingPage from '@/components/LoadingPage';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal'],
  variable: '--font-inter',
});

function MyApp({ Component, pageProps }) {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  
  Router.events.on('routeChangeStart', (url) => {
    setIsLoadingPage(true);
  });
  Router.events.on('routeChangeComplete', url => {
    setIsLoadingPage(false);
  });

  return (
    <>
      <Head>
        <title>Запчастюлька</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Запчастини для авто та сільгосптехніки Запчастюлька"
        />
        <meta
          property="og:title"
          content="Запчастини для авто та сільгосптехніки Запчастюлька"
        />
        <meta
          name="keywords"
          content="Запчастини для авто та сільгосптехніки Запчастюлька"
        />
        <meta
          property="og:description"
          content="Запчастини для авто та сільгосптехніки"
        />
        <meta
          property="og:url"
          content="https://zapchaztiulka-catalog-frontend.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Head>
      {isLoadingPage && <LoadingPage />}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusProvider>
            <Layout className={inter.className}>
              <Component {...pageProps} />
            </Layout>
          </StatusProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
