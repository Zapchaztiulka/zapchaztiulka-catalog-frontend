import React from "react";
import { Layout } from "@/components";
import "../styles/globals.css";
import 'overlayscrollbars/overlayscrollbars.css';

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Context } from "@/context/context";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Context>
        <Layout className={inter.className}>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </Provider>
  );
}

export default MyApp;
