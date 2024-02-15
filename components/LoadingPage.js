import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingPage = () => {

  return (
    <div className="modal-overlay">
      <div className="absolute top-[50%] left-[50%] w-[100px] h-[100px] m-auto">
        <RotatingLines
          strokeColor="#1570EF"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
