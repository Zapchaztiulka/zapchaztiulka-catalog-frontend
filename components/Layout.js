import React, { useState } from "react";

import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import { Chat, ChatButton } from "./Chat";

const Layout = ({ children }) => {
  const [isChatOpen, setChatOpen] = useState(false);

  return (
    <div className="relative">
      <Navbar />
      <main className=" main-container mt-[50px]">{children}</main>
      <div id="modal-root"></div>
      <Footer />
      {!isChatOpen ? (
        <ChatButton onClick={() => setChatOpen(true)} />
      ) : (
        <Chat onClick={() => setChatOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
