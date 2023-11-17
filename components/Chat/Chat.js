import React, { useState, useEffect } from "react";

import { socket } from "./socket";
import { CloseIcon } from "@/public/icons";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_DEV_URL
    : process.env.BASE_PROD_URL;

export const Chat = ({ onClick }) => {
  const [isOpenChat, setIsOpenChat] = useState(true);
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    socket.on("minimizeChat", ({ userId, isChatRoomOpen }) => {
      if (storedUserId === userId) {
        setIsOpenChat(isChatRoomOpen === undefined ? true : isChatRoomOpen);
      }
    });

    return () => {
      socket.off("minimizeChat");
    };
  }, [storedUserId]);

  return (
    <div
      className={`sticky bottom-0 left-1/2 z-[100] ${
        isOpenChat ? "w-[50vw] h-[70vh]" : "w-[50vw] h-[7vh]"
      } bg-bgWhite border-2 border-solid border-borderDefault shadow-xl`}
    >
      <div className=" bg-bgBrandDark">
        <button
          className="close-chat-btn"
          type="button"
          onClick={() => onClick()}
        >
          <CloseIcon
            className="close-icon stroke-iconWhite"
            width="44"
            height="44"
            strokeWidth="2"
          />
        </button>
      </div>
      <iframe
        src={`${BASE_URL}?userId=${storedUserId}`}
        className="w-full h-full"
      />
    </div>
  );
};
