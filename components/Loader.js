"use client"
import React from "react";
import { ColorRing } from 'react-loader-spinner';


const Loader = () => {
  return (
    <div className=" h-full block mx-auto">
      <ColorRing
        colors={[
          'rgba(239, 248, 255, 1)',
          'rgba(209, 233, 255, 1)',
          'rgba(46, 144, 250, 1)',
          'rgba(21, 112, 239, 1)',
          'rgba(209, 233, 255, 1)',
        ]}
      />
    </div>
  );
};

export default Loader;
