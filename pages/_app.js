import React from "react";
import Head from "next/head";
import { Layout } from "@/components";
import "../styles/globals.css";
import "overlayscrollbars/overlayscrollbars.css";
import { Inter } from "next/font/google";
import { configureStore } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
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
          <Layout className={inter.className}>
            <Component {...pageProps}  />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
