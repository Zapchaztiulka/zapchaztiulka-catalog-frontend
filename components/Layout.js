import React, { useState, useEffect } from 'react';

import { socket } from './Chat/socket';
import Navbar from './Header/Navbar';
import Footer from './Footer/Footer';
import { Chat, ChatButton } from './Chat';

const Layout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [countUnreadMessages, setCountUnreadMessages] = useState(null);
  const storedUserId = localStorage.getItem('userId');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoint = 600;

  // handle when user open a chat
  const handleChatButtonClick = () => {
    setIsChatOpen(true);
    socket.emit('toggleChat', { userId: storedUserId, isChatRoomOpen: true });
    socket.emit('leavePage', { userId: storedUserId, isLeavePage: false });
  };

  // handle when user minimizes a chat room
  useEffect(() => {
    socket.on('toggleChat', ({ userId, isChatRoomOpen }) => {
      if (storedUserId === userId) {
        setIsChatOpen(isChatRoomOpen);
      }
    });

    return () => {
      socket.off('toggleChat');
    };
  }, [storedUserId]);

  // handle when user leave a page of on-line store
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        socket.emit('leavePage', {
          userId: storedUserId,
          isLeavePage: true,
        });
      } else {
        socket.emit('leavePage', {
          userId: storedUserId,
          isLeavePage: false,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // get a count of unread manager messages by User
  useEffect(() => {
    socket.on(
      'countUnreadManagerMessages',
      ({ userId, countUnreadManagerMessages }) => {
        if (storedUserId === userId) {
          setCountUnreadMessages(countUnreadManagerMessages);
        }
      }
    );

    return () => {
      socket.off('countUnreadManagerMessages');
    };
  }, [storedUserId]);

  // handle window resize if width is more or less breakpoint
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;

      if (
        (windowWidth < breakpoint && newWidth >= breakpoint) ||
        (windowWidth >= breakpoint && newWidth < breakpoint)
      ) {
        setWindowWidth(newWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <>
      <div
        className={`${isChatOpen && windowWidth < breakpoint ? 'hidden' : ''}`}
      >
        <Navbar />
        <main className="main-container mt-[50px]">{children}</main>
        <div id="modal-root"></div>
        <Footer />
      </div>
      <div
        className={`fixed bottom-s right-s z-50 ${isChatOpen ? 'hidden' : ''}`}
      >
        <ChatButton
          onClick={handleChatButtonClick}
          countUnreadMessages={countUnreadMessages}
        />
      </div>
      <div
        className={`fixed bottom-0 right-0 z-50 tablet600:bottom-s tablet600:right-s ${
          isChatOpen ? '' : 'hidden'
        }`}
      >
        <Chat windowWidth={windowWidth} />
      </div>
    </>
  );
};

export default Layout;
