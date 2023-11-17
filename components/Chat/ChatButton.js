import React from "react";

export const ChatButton = ({ onClick }) => {
  return (
    <button
      onClick={() => onClick(true)}
      className="sticky bottom-[5%] left-[92%] z-[100] w-fit h-fit bg-bgBrandLight1 rounded-full text-4xl p-s"
    >
      Чат
    </button>
  );
};
