import React from 'react'

const BtnPrimary = ({ children, onClick, width }) => {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`common-style standard-button primary-button ${width}`} 
      onClick={handleButtonClick}
    >
      {children}
    </button>
  )
};

export default BtnPrimary
