import React from 'react'

const BtnTertiary = ({ children, onClick, width, color }) => {
   const handleButtonClick = () => {
     if (onClick) {
       onClick();
     }
   };

   return (
     <button className={`tertiary-button ${color} ${width}`} onClick={handleButtonClick}>
       {children}
     </button>
   );
};

export default BtnTertiary
