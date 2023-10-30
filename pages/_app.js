import React from "react";
import { Layout } from "@/components";
import "../styles/globals.css";
import "overlayscrollbars/overlayscrollbars.css";
import { Inter } from "next/font/google";
import { Context } from "@/context/context";
import ReduxProvider from "@/redux/ReduxProvider";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Context>
        <Layout className={inter.className}>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </ReduxProvider>
  );
}

export default MyApp;
