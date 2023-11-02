import React from "react";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import ReduxProvider from "@/redux/ReduxProvider";

const Layout = ({ children }) => {
  return (
    <>
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
