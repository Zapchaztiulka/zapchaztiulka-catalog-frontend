import React from "react";
import Head from "next/head";
import { Layout } from "@/components";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { StatusProvider } from "@/context/statusContext";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal'],
  variable: '--font-inter',
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Запчастюлька</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
