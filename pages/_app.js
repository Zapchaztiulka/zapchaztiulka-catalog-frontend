import React from "react";
import Head from "next/head";
import { Layout } from "@/components";
import "../styles/globals.css";
import "overlayscrollbars/overlayscrollbars.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout className={inter.className}>
      <Head>
        <title>Запчастюлька</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
