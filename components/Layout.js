import React from "react";
import Head from "next/head";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import ReduxProvider from "@/redux/ReduxProvider";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Запчастюлька</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>    
      <ReduxProvider>
        <Navbar />
        <main className="container main-container mt-[50px]">{children}</main>
        <div id="modal-root"></div>
        <Footer />   
        </ReduxProvider>  
    </>
  );
};

export default Layout;
