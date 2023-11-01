import React from "react";
import { Layout } from "@/components";
import "../styles/globals.css";
import "overlayscrollbars/overlayscrollbars.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

function MyApp({ Component, pageProps }) {

  return (
    <ReduxProvider>
        <Layout className={inter.className}>
          <Component {...pageProps} />
        </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
