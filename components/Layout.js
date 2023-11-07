import React from "react";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
        <Navbar />
        <main className=" main-container mt-[50px]">{children}</main>
        <div id="modal-root"></div>
        <Footer />
    </>
  );
};

export default Layout;
