import React from 'react';

import { ChatIcon } from '@/components/Icons';

export const ChatButton = ({ onClick, countUnreadMessages }) => {
  return (
    <button
      onClick={() => onClick(true)}
      className="sticky transform -translate-x-s -translate-y-s bg-bgBrandLight3
               hover:bg-bgHoverBlue transition-colors duration-300 rounded-large p-m"
    >
      <div className="relative wrapper">
        <ChatIcon />
        {countUnreadMessages && (
          <>
            <div
              className="absolute top-[-30%] right-[-30%] w-[18px] h-[18px] bg-bgWhite 
                        rounded-[50%] text-xs font-normal text-iconBrand flex items-center justify-center"
            >
              {countUnreadMessages}
            </div>
            <div
              className="description hidden absolute bottom-[150%] right-[50%] text-textContrast 
                       bg-bgGreyDark p-xs2 rounded-medium whitespace-nowrap z-10"
            >
              Непрочитаних повідомлень: {countUnreadMessages}
            </div>
          </>
        )}
      </div>
    </button>
  );
};
