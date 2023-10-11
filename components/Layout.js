import React from "react";
import Head from "next/head";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Запчастюлька</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="container main-container mt-[50px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
