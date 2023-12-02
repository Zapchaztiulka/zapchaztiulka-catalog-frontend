import React from 'react'

const BtnChips = ({ children, onClick, width, color }) => {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`chips-button ${color} ${width}`}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default BtnChips
