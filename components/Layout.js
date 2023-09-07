import React from 'react'

import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Zapchaztiulki</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="border-b border-border-default">
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer className="border-t border-border-default lg:pt-[42px] px-4 xl:pr-[120px] xl:pl-[120px] py-6 ">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
